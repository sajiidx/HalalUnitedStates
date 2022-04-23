import React, {useEffect, useState} from 'react'
import { Button, StyleSheet, Text, View, Image, ActivityIndicator, ScrollView} from 'react-native'
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase';
import 'firebase/firestore';
import DropDownPicker from 'react-native-dropdown-picker';
import { connect } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import StoreImagesScreen from './StoreImagesScreen';

function ProfileScreen({profile}) {
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [buffering, setBuffering] = useState(false);

    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestCameraRollPermissionsAsync();
            setHasGalleryPermission(galleryStatus.status === 'granted');

            // firebase.firestore()
            // .collection('Stores')
            // .get()
            // .then((snap) => {
            //     const categories = snap.docs.map((doc) => {
            //         return {value: doc.id, label: doc.data().name}
            //     })
            //     setItems(categories);
            // }).catch((err) => console.log(err))
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
        firebase.firestore().collection('Stores')
        .doc(firebase.auth().currentUser.uid)
        .set({
            urls: firebase.firestore.FieldValue.arrayUnion({ link: downloadURL })
        }, { merge: true })
        .then((function(){
            alert("Image Uploaded")
            setImage(null)
        }))
        .catch((error) => {
            alert(error.message);
        }).finally(() => {
            setBuffering(false)
        })
    }

    const uploadImage = async () => {
        setBuffering(true)
        const uri = image;
        const childPath = `stores/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
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
            setBuffering(false)
            console.log(snapshot);
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted);
    }

    if (hasGalleryPermission === null) {
        return <View />;
    }
    if (hasGalleryPermission === false) {
        return <Text>No access to storage</Text>;
    }


  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{uri: require('../images/profile.png')}} />
                </View>
            </View>
            <View style={styles.detailsContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{profile.title}</Text>
                    <Text style={styles.owner}>{profile.owner}</Text>
                </View>
                <View style={styles.locationContainer}>
                    <View>
                        <MaterialCommunityIcons name="map-marker" size={20} color={"#ddd"} />
                    </View>
                    <Text style={styles.location}>{profile.state}, {profile.country}</Text>
                </View>
                <View style={styles.aboutContainer}> 
                    <Text style={styles.about}>{profile.about}</Text>
                </View>
                
                {/* <Text>{profile.address}</Text> */}
                <View style={styles.buttonsContainer}>
                    <View  style={styles.buttonContainer}>
                        <Button  color={'#D2042D'} title='logout' onPress={() => firebase.auth()
                            .signOut()
                            .then(() => alert("User is signed out!"))
                            .catch((err) => alert(err.message))}
                        />
                    </View>
                    {(buffering)?(
                        <View  style={styles.buttonContainer}>
                            <Button  title='Buffering' color={'#D2042D'}/>
                        </View>
                    ):(
                        <View  style={styles.buttonContainer}>
                            <Button  color={'#C1C2FA'} title='Pick Store Image' onPress={() => pickImage()}/>
                        </View>
                    )}
                    
                    {(image)?(
                        (!buffering)?(
                        <View style={{flex: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                            <View>
                                <Image style={{width: 40, height: 40}} source={{uri: image}} />
                            </View>
                            <View  style={styles.buttonContainer}>
                                <Button color={'#C1C2FA'} title='Upload Store Image' onPress={() => uploadImage()}/>
                            </View>
                        </View>
                        ):(
                            <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                                <ActivityIndicator size={24} color={'#282828'} />
                            </View>
                        )
                    ):(
                        <View style={{flex: 2}}>

                        </View>
                    )}
                    
                </View>
            </View>
        </View>
        <View style={{flex: 1}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontWeight: '200', color: '#999'}}>Physical appearance of Store: </Text>
            </View>
            <StoreImagesScreen />
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems:'center',
        backgroundColor: '#fff'
    },
    profileContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    imageContainer: {
        padding: 0,
        margin: 0,
        overflow: 'hidden',
        borderRadius: '50%',
    },
    image: {
        alignSelf: 'flex-end',
        width: 200,
        height: 200
    },
    detailsContainer: {
        flex: 4,
        padding: 10,
    },
    titleContainer: {
        padding: 10,
    },
    locationContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    owner: {
        color: '#453284',
        fontSize: 32,
        fontWeight: 'bold'
    },
    title: {
        color: '#F5A922',
        fontSize: 18,
        fontWeight: 'bold'
    },
    location: {
        color: '#acacac',
        fontSize: 14,
        fontWeight: '300'
    },
    aboutContainer: {
        padding: 10
    },
    about: {
        color: "#B4B4E6",
        fontSize: 14,
    },
    buttonsContainer: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    buttonContainer: {
        flex: 1,
        marginRight: 10,
    }
})

const mapStateToProps = (store) => ({
    profile: store.userState.profile
})

export default connect(mapStateToProps, null)(ProfileScreen);
