import React from 'react';
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';
import firebase from 'firebase';
import "firebase/firestore";
import { useState, useEffect } from 'react';
import { Image, TouchableOpacity, Text, View, StyleSheet, Button} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCartItems,
    fetchWishlistItems,
    addItemToCart,
    removeItemFromCart,
    addCartItemToGUI,
    removeCartItemFromGUI,
    addItemToWishlist,
    removeItemFromWishlist,
    addWishlistItemToGUI,
    removeWishlistItemFromGUI
} from '../../redux/actions';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
let wishlist = {};
let cart = {};
let count = 0;

function truncateString(str, num) {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  }

function Product(props) {
    const {item} = props;

    const [seller, setSeller] = useState('');
    const [store, setStore] = useState('');
    const [category, setCategory] = useState('');
    const [addedInWishlist, setAddedInWishlist] = useState(false);
    const [addedInCart, setAddedInCart] = useState(false);

    const AddItemToCart = () => {
        props.addItemToCart(item);
        props.addCartItemToGUI(item);
        // setAddedInCart(true);
    }

    const RemoveItemFromCart = () => {
        props.removeItemFromCart(item.id);
        props.removeCartItemFromGUI(item.id);
        // setAddedInCart(false);
    }
    
    const AddItemInWishList = () => {
        console.log(item);
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
        if(count == 0 && item.store != firebase.auth().currentUser.uid){
            firebase.database()
            .ref('products')
            .child(item.id)
            .child('impressions')
            .set(firebase.database.ServerValue.increment(1))
            .then((result) => count+= 1)
            
        }

        firebase.firestore().collection("Stores").doc(item.store).get()
        .then((snapshot)=>{
            if(snapshot.exists){
                setSeller(snapshot.data().owner);
                setStore(snapshot.data().title);
            }
            else
                console.log("Store doesn't Exist");
        });
        firebase.firestore().collection("Category").doc(item.category).get()
        .then((snapshot)=>{
            if(snapshot.exists){
                setCategory(snapshot.data().name);
            }
            else
                console.log("Category doesn't Exist");
        });

        cart = props.cart;
        wishlist = props.wishlist;

        if(wishlist.items){
            const foundw = wishlist.items.some(el => el.id == item.id);
            if (foundw){
                setAddedInWishlist(true);
            }else{
                setAddedInWishlist(false);
            }
        }
        if(cart.items){
            const foundc = cart.items.some(el => el.id == item.id);
            if (foundc){
                setAddedInCart(true)
            } else{
                setAddedInCart(false)
            }
        }
    }, [props.cart.items, props.wishlist.items, props.gui.cart.items, props.gui.wishlist.items]);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {
                if(item.store != firebase.auth().currentUser.uid){
                    firebase.firestore()
                    .collection("Activity")
                    .doc(firebase.auth().currentUser.uid)
                    .collection("Logs")
                    .add({
                        time: firebase.firestore.FieldValue.serverTimestamp(),
                        subject: firebase.auth().currentUser.uid,
                        subjectType: "Customer",
                        object: item.id,
                        objectType: "Product",
                        action: "Viewed",
                        actionType: "Read"
                    }).then((snap) => {
                        firebase.database()
                        .ref('products')
                        .child(item.id)
                        .child('clicks')
                        .set(firebase.database.ServerValue.increment(1))
                        .then((result) => console.log("Done"))
                    }).catch((error) => console.error(error))
                }
                props.navigation.navigate("ProductDetails", {item});
            }} style={styles.imageContainer}>
                <Image resizeMode={"contain"} style={styles.image} source={{ uri: item.downloadURL }} />
            </TouchableOpacity>
            <View style={styles.productDetails}>
                <Text style={styles.title}>{truncateString(item.title, 15)}</Text>
                <Text style={styles.category}>{category}</Text>
                <Text style={styles.price}>${item.price}</Text>
            </View>
            {(item.store == firebase.auth().currentUser.uid)?(
                <View style={styles.actionsContainer}>
                    <Text style={{color: '#D2042D', fontWeight: '400'}}>Can't like or buy your own products</Text>
                </View>
            ): (
                <View style={styles.actionsContainer}>
                
                {(addedInWishlist)?(
                    <TouchableOpacity onPress={RemoveItemFromWishList} >
                        <MaterialCommunityIcons name="heart" size={24} color={"red"} />
                    </TouchableOpacity>
                ): (
                    <TouchableOpacity onPress={AddItemInWishList} >
                        <MaterialCommunityIcons name="heart-outline" size={24} color={"darkgrey"} />
                    </TouchableOpacity>
                )}
                {(addedInCart)?(
                    <TouchableOpacity onPress={RemoveItemFromCart} >
                        <MaterialCommunityIcons name="cart-off" size={24} color={"darkgrey"} />
                    </TouchableOpacity>
                    // <Button onPress={RemoveItemFromCart} title="Remove from Cart" />
                ):(
                    <TouchableOpacity onPress={AddItemToCart} >
                        <MaterialCommunityIcons name="cart-plus" size={24} color={"darkgrey"} />
                    </TouchableOpacity>
                    // <Button onPress={AddItemToCart} title="Add to Cart"/>
                )}
                
            </View>
            )}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginVertical: '1%',
        marginHorizontal: '1%',
        overflow: 'hidden',
    },
    imageContainer: {
        margin: 0,
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    image: {
        height: 150,
        width: 150,
    },
    productDetails: {
        margin: '1%',
        paddingVertical: "2.5%",
        paddingHorizontal: '5%',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    price: {
        color: '#F5A922',
        fontSize: 18,
        fontWeight: '500'
    },
    category: {
        color: "#B4B4E6",
        fontSize: 14,
        fontWeight: '300'
    },
    actionsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '1%',
        paddingHorizontal: "5%",
        width: '100%'
    }
})
const mapStateToProps = (store) => ({
    wishlist: store.userState.wishlist,
    cart: store.userState.cart,
    gui: store.userState.gui
})
const mapDispatchProps = (dispatch) => bindActionCreators({
    fetchWishlistItems,
    fetchCartItems,
    addItemToCart,
    removeItemFromCart,
    addCartItemToGUI,
    removeCartItemFromGUI,
    addItemToWishlist,
    removeItemFromWishlist,
    addWishlistItemToGUI,
    removeWishlistItemFromGUI
}, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Product)
