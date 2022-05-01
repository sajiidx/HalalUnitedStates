import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, Button, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from 'firebase';
require("firebase/firestore");
import { 
    loadCartGUI,
    fetchWishlistItems,
    fetchCartItems,
    addItemToCart,
    removeItemFromCart,
    addCartItemToGUI,
    removeCartItemFromGUI,
    addItemToWishlist,
    removeItemFromWishlist,
    addWishlistItemToGUI,
    removeWishlistItemFromGUI,
    loadCost,
    updateCartGUIQont
} from '../../redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Counter from '../Counter';
import { flex } from 'styled-system';
// import NumericInput from 'react-native-numeric-input';
// import CounterInput from "react-native-counter-input";

function truncateString(str, num) {
    if (str && str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
}
let wishlist = {};
let cart = {};

const CartItem = function(props){
    const [item, setItem] = useState(props.item);
    const [quantity, setQuantity] = useState(1);
    const [addedInWishlist, setAddedInWishlist] = useState(false);
    const [addedInCart, setAddedInCart] = useState(false);
    const [category, setCategory] = useState('')

    const AddItemToCart = () => {
        props.addItemToCart(item);
        props.addCartItemToGUI(item);
    }

    const RemoveItemFromCart = () => {
        props.removeItemFromCart(item.id);
        props.removeCartItemFromGUI(item.id);
        props.loadCost()
    }
    
    const AddItemInWishList = () => {
        console.log(item)
        props.addItemToWishlist(item);
        props.addWishlistItemToGUI(item);
        setAddedInWishlist(true);
    }

    const RemoveItemFromWishList = () => {
        props.removeItemFromWishlist(item.id);
        props.removeWishlistItemFromGUI(item.id);
        setAddedInWishlist(false);
    }

    useEffect(() => {
        wishlist = props.wishlist;

        if(wishlist.items){
            const foundw = wishlist.items.some(el => el.id == item.id);
            if (foundw) setAddedInWishlist(true);
        }

        firebase.firestore().collection("Category").doc(item.category).get()
        .then((snapshot)=>{
        if(snapshot.exists){
            setCategory(snapshot.data().name);
        }
        else
            console.log("Category doesn't Exist");
        });
        setItem(props.item)
    }, [props.item.id, props.item, props.wishlist, props.cart, props.gui.cart.items]);

    return (
        <View key={item.id} style={styles.container}>
            <View style={styles.imageContainer}>
                <Image resizeMode='contain' source={{uri: item.downloadURL}} style={styles.image} />
            </View>
            <View style={{flex: 1}}>
                <View style={styles.productDetails}>
                    <View style={{flex: 2}}>
                        <Text style={styles.title}>{truncateString(item.title, 35)}</Text>
                        <Text style={{marginVertical: 5, fontWeight: '300', fontSize: 14, color: "#999"}}>{category}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={styles.price}>${item.price}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Counter id={item.id} price={item.price} initial={quantity} min={1} max={item.quantity} /> 
                    </View>
                    <TouchableOpacity onPress={RemoveItemFromCart} style={{flex: 1}}>
                        <MaterialCommunityIcons style={{alignSelf: 'flex-end'}} name="close" size={32} color={"#282828"} />
                    </TouchableOpacity>  
                </View>
            </View>                
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        margin: 10,
        overflow: 'hidden',
        minHeight: '100%'
    },
    imageContainer: {
        margin: 0,
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 150,
        width: 150,
    },
    productDetails: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        margin: 10,
        paddingHorizontal: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    price: {
        color: '#AAA',
        fontSize: 18,
        fontWeight: '400',
    },
    counterContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    actionsContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
        width: '100%'
    }
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts,
    following: store.userState.following,
    wishlist: store.userState.wishlist,
    cart: store.userState.cart,
    gui: store.userState.gui,
    cost: store.userState.cost
})

const mapDispatchProps = (dispatch) => bindActionCreators({
    loadCartGUI,
    fetchWishlistItems,
    fetchCartItems,
    addItemToCart,
    removeItemFromCart,
    addCartItemToGUI,
    removeCartItemFromGUI,
    addItemToWishlist,
    removeItemFromWishlist,
    addWishlistItemToGUI,
    removeWishlistItemFromGUI,
    loadCost,
    updateCartGUIQont
}, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(CartItem);