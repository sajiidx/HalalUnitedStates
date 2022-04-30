import React from 'react';
import { TextInput, Image, Text, View, Button, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase';
import 'firebase/firestore';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Add({ navigation }) {

    const [title, setTitle] = useState('');
    const [quantity, setQuantity] = useState('');
    const [quality, setQuality] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('')

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Apple', value: 'apple'},
        {label: 'Banana', value: 'banana'}
    ]);

    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');

            const galleryStatus = await ImagePicker.requestCameraRollPermissionsAsync();
            setHasGalleryPermission(galleryStatus.status === 'granted');

            firebase.firestore()
            .collection('Category')
            .get()
            .then((snap) => {
                const categories = snap.docs.map((doc) => {
                    return {value: doc.id, label: doc.data().name}
                })
                setItems(categories);
            }).catch((err) => console.log(err))
            })();
    }, [image]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        });
        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const savedProductData = (downloadURL) => {
        firebase.firestore().collection('Products')
        .add({
            creation: firebase.firestore.FieldValue.serverTimestamp(),
            downloadURL,
            title,
            quantity: parseInt(quantity),
            description,
            keywords: ['Clothes', 'For Women', 'For Kids', 'For Men', 'Electronic'],
            price: parseFloat(price),
            quality,
            category,
            public: true,
            store: firebase.auth().currentUser.uid,
            rating: 0
        })
        .then((snapshot) => {
            firebase.firestore()
            .collection("Logs")
            .add({
                time: firebase.firestore.FieldValue.serverTimestamp(),
                user: firebase.auth().currentUser.uid,
                userRole: "Seller",
                object: snapshot.id,
                objectType: "Product",
                on: "Store",
                action: "Added",
                actionType: "Write"
            }).then((snap)=> {
                firebase.firestore()
                .collection("Activity")
                .doc(firebase.auth().currentUser.uid)
                .collection("Logs")
                .add({
                    time: firebase.firestore.FieldValue.serverTimestamp(),
                    subject: firebase.auth().currentUser.uid,
                    subjectType: "Seller",
                    object: snapshot.id,
                    objectType: "Product",
                    action: "Item added to Store",
                    actionType: "Write"
                }).then((snap) => {
                    firebase.database()
                    .ref("products")
                    .child(snapshot.id)
                    .child("quantity")
                    .set(parseInt(quantity))
                    .then((result) =>  navigation.popToTop())
                }).catch((error) => console.error(error))
            }).catch((error) => console.error(error))
            
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const uploadImage = async () => {
        const uri = image;
        const childPath = `products/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
        const response = await fetch(uri);
        const blob = await response.blob();

        const task = firebase
            .storage()
            .ref()
            .child(childPath)
            .put(blob);
        
        const taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTransferred}`);
        }

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                savedProductData(snapshot);
                console.log(snapshot);
            });
        }

        const taskError = snapshot => {
            console.log(snapshot);
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted);
    }

    if (hasCameraPermission === null || hasGalleryPermission === false) {
        return <View />;
    }
    if (hasCameraPermission === false || hasGalleryPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.body}>
                <View style={styles.boxContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>Add Product</Text>
                    </View>
                    <View style={styles.basicDetailsContainer}>
                        <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            { image ? (
                                <TouchableOpacity onPress={() => pickImage()}>
                                    <Image source={{uri: image}} style={styles.image}/>
                                </TouchableOpacity>
                            ):(
                                <TouchableOpacity onPress={() => pickImage()} style={styles.uploadImageContianer}>
                                    <MaterialCommunityIcons name="upload" size={42} color={'#ddd'} />
                                </TouchableOpacity>
                            )}
                        </View>
                        <View>
                            <TextInput onChangeText={(title)=>setTitle(title)} style={styles.textInput} placeholder="Product Name"/>
                            <TextInput onChangeText={(quality)=>setQuality(quality)} style={styles.textInput} placeholder="Quality" keyboardType="numeric"/>
                            <TextInput onChangeText={(quantity)=>setQuantity(quantity)} style={styles.textInput} placeholder="Quantity" keyboardType="numeric"/>
                            <TextInput onChangeText={(price)=>setPrice(price)} style={styles.textInput} placeholder="Price" keyboardType="numeric"/>
                        </View>
                        <View>
                            <Text>Category: </Text>
                            <DropDownPicker
                                zIndex={1000}
                                open={open}
                                value={value}
                                items={items}
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setItems}
                                onChangeValue={(value) => setCategory(value)}
                                style={styles.category}
                                containerStyle={styles.categoryContainer}
                            />
                        </View>
                    </View>
                    
                    <View style={styles.descriptionContainer}>
                        <TextInput onChangeText={(description)=>setDescription(description)} style={styles.description} placeholder="Description" multiline={true} maxLength={750}/>
                    </View>
                    
                    <View style={styles.actionContainer}>
                        <View style={styles.buttonContianer}>
                            <Button title='Add Product' onPress={() => uploadImage()}/>
                        </View>
                        <View style={styles.buttonContianer}>
                            <Button title="Cancel" onPress={()=> navigation.navigate('Home')}/>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxContainer: {
        margin: 10,
        padding: 20,
        borderRadius: 5,
        shadowColor: '#ddd',
        shadowRadius: 5
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    headerText: {
        fontWeight: '400',
        fontSize: 24
    },
    basicDetailsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 10,
    },
    uploadImageContianer: {
        display: 'flex',
        borderColor: '#ddd',
        borderWidth: 2,
        borderRadius: 5,
        height: 250,
        width: 200,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        flexGrow: 1,
    },
    textInput: {
        margin: 10,
        padding: 10,
        borderColor: '#fff',
        borderRadius: 5,
        shadowColor: '#ddd',
        shadowRadius: 5,
    },
    descriptionContainer: {
        padding: 10,
    },
    description: {
        height: 100,
        padding: 10,
        borderColor: '#fff',
        borderRadius: 5,
        shadowColor: '#ddd',
        shadowRadius: 5,
    },
    imageContainer: {

    },
    image: {
        height: 200,
        width: 200,
    },
    actionContainer: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    buttonContianer: {
    },
    category: {
        backgroundColor: '#FFF'
    },
    categoryContainer: {
        backgroundColor: '#FFF'
    }
})
