import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import React, { Component } from 'react';
import Product from '../components/main/Product';
import firebase from 'firebase';
import { useState, useEffect } from 'react';
require('firebase/firestore');

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWishlistItems, fetchCartItems, loadCartGUI } from '../redux/actions';

const screenWidth = Dimensions.get("window").width

export function StoreImagesScreen(props) {
    const [urls, setURLs] = useState([]);
    const [timeout, setTimeout] = useState(false);

    useEffect(() => {
        firebase.firestore()
        .collection("Stores")
        .doc(props.id)
        .onSnapshot((snapshot) => {
            setURLs(snapshot.data().urls);
        },(error) => console.error(error), () => setTimeout(true));
    }, []);

    const renderProducts = () => {
        if(!timeout && (!urls || urls.length == 0)){
            return (
                <View style={styles.container}>
                    <ActivityIndicator size={32} color={'#111'}/>
                </View>
            )
        }
        else if(timeout && (!urls || urls.length == 0)){
            return (
                <View style={styles.container}>
                    <Text>Nothing To Show!</Text>
                </View>
            )
        }
        return urls.map((item, index) => {
            return (
                <View key={index}>
                    <Image resizeMode={'contain'} source={{uri: item.link}} key={index} style={{width: 200, height: 200}}/>
                </View>
            )
        });
    }
    if(screenWidth <= 580){
        if(!timeout && (!urls || urls.length == 0)){
            return (
                <View style={styles.container}>
                    <ActivityIndicator size={32} color={'#111'}/>
                </View>
            )
        }
        else if(timeout && (!urls || urls.length == 0)){
            return (
                <View style={styles.container}>
                    <Text>Nothing To Show!</Text>
                </View>
            )
        }
        return (
            <View style={mstyles.container}>
                <FlatList
                    data={urls}
                    renderItem={({item}) => (
                        <View style={mstyles.imageContainer}>
                            <Image resizeMode={'contain'} source={{uri: item.link}} style={mstyles.image}/>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }

    return (
        <View style={styles.xcontainer}>
            {renderProducts()}
        </View>
    );
}

const mstyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    xcontainer: {
        backgroundColor: '#fff',
        flexWrap: 'wrap', 
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        padding: 5
    },
    imageContainer: {
        flex: 1
    },
    image: {
        width: '100%',
        height: 100,
    }
})

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flexWrap: 'wrap', 
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        padding: 5
    },
    xcontainer: {
        backgroundColor: '#fff',
        flexWrap: 'wrap', 
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        padding: 5
    }
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    wishlist: store.userState.wishlist,
    cart: store.userState.cart,
    gui: store.userState.gui
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchWishlistItems, fetchCartItems, loadCartGUI}, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(StoreImagesScreen);
