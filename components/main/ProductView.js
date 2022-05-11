import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import React, { Component } from 'react';
import Product from './Product';
import firebase from 'firebase';
import { useState, useEffect } from 'react';
require('firebase/firestore');
import { Dimensions } from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWishlistItems, fetchCartItems, loadCartGUI } from '../../redux/actions';

export function ProductView(props) {

    const [products, setProducts] = useState([]);
    const [timeout, setTimeout] = useState(false);

    useEffect(() => {
        firebase.firestore()
                .collection("Products")
                .where("public", "==", true)
                .orderBy("rating", "desc")
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
    }, [props.wishlist.items, props.cart.items]);

    function renderProducts(){
        return products.map((item) => {
            return (
                <Product navigation={props.navigation} key={item.id} item={item}/>
            );
        });
    }

    if(!timeout && products.length == 0){
        return (
            <View style={styles.empty}>
                <ActivityIndicator size={24} color={'#111'}/>
            </View>
        )
    } else if(timeout && products.length == 0){
        return (
            <View style={styles.empty}>
                <Text>Internet Connection is slow or Database is Empty!</Text>
            </View>
        )
    }

    if(Dimensions.get("window").width <= 580){
        return(
            <View style={mstyles.container}>
                <FlatList
                    style={{flex: 1}}
                    data={products}
                    renderItem={({item}) => <Product navigation={props.navigation} item={item} />}
                    keyExtractor={(item, index) => item.id}
                    numColumns={2}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={{flex: 1}}
                data={products}
                renderItem={({item}) => <Product navigation={props.navigation} item={item} />}
                keyExtractor={(item, index) => item.id}
                numColumns={4}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )

    // return (
    //     <View style={styles.container}>
    //         {
    //             renderProducts()
    //         }
    //     </View>
    // );
}

const mstyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    empty: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexWrap: 'wrap', 
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        margin: 10,
        padding: 5
    },
    empty: {
        flex: 1,
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
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

export default connect(mapStateToProps, mapDispatchProps)(ProductView);
