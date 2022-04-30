import React, {useEffect, useState} from 'react'
import { Button, StyleSheet, Text, View, Image, ActivityIndicator, ScrollView} from 'react-native'
import firebase from 'firebase';
import 'firebase/firestore';
import { connect } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import StoreImagesScreen from './StoreImagesScreen';

function ProfileScreen(props) {
    const [id, setID] = useState(props.route.params.id)
    const [profile, setProfile] = useState(null)
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null)

    useEffect(() => {
        firebase.firestore()
        .collection("Stores")
        .doc(id)
        .get()
        .then((snap) => {
            setProfile(snap.data())
        }).catch((reason) => {
            setError(reason.message)
        }).finally(() => setLoaded(true))
    }, []);

    if(!loaded){
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
                <ActivityIndicator size={24} color={'#000'}/>
            </View>
        )
    }
    if(loaded && error){
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
            <Text>{error}</Text>
            <Button title='Back' onPress={() => props.navigation.goBack()}/>
        </View>
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
                <View style={styles.buttonsContainer}>
                    <View  style={styles.buttonContainer}>
                        <Button  color={'#D2042D'} title='Report' />
                    </View>          
                </View>
            </View>
        </View>
        <View style={{flex: 1}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontWeight: '200', color: '#999'}}>Physical appearance of Store: </Text>
            </View>
            <StoreImagesScreen id={id}/>
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
