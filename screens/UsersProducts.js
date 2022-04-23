import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import React, { Component } from 'react';
import Product from '../components/main/Product';
import firebase from 'firebase';
import { useState, useEffect } from 'react';
require('firebase/firestore');

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWishlistItems, fetchCartItems, loadCartGUI } from '../redux/actions';

export function UsersProducts(props) {
    const [store, setStore] = useState(props.route.params.store)
    const [products, setProducts] = useState([]);
    const [timeout, setTimeout] = useState(false);

    useEffect(() => {
        if(store){
            firebase.firestore()
            .collection("Products")
            .where("store", "==", store)
            .orderBy("creation", "desc")
            .get()
            .then((snapshot) => {
                let prods = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })
                setProducts(prods);
            }).catch((error) => console.log(error))
            .finally(() => setTimeout(true));
        }
    }, [props.wishlist.items, props.cart.items, props.route.params.category, props.route.params.uid]);

    const renderProducts = () => {
        if(!timeout && products.length == 0){
            return (
                <View style={styles.container}>
                    <ActivityIndicator size={32} color={'#111'}/>
                </View>
            )
        }else if(timeout && products.length == 0){
            return (
                <View style={styles.container}>
                    <Text>Nothing To Show!</Text>
                </View>
            )
        }
        return products.map(item => <Product navigation={props.navigation} key={item.id} item={item}/>);
    }

    return (
        <View style={styles.xcontainer}>
            {renderProducts()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        flex: 1,
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

export default connect(mapStateToProps, mapDispatchProps)(UsersProducts);
