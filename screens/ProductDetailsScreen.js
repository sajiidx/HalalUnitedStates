import React, { useEffect, useState } from 'react'
import {View, Text, StyleSheet, Image, Button, ScrollView, TouchableOpacity} from 'react-native'
import firebase from 'firebase';
import "firebase/firestore";

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
} from '../redux/actions';

let wishlist = {};
let cart = {};
let months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

export function ProductDetailsScreen(props) {
  const [item, setItem] = useState(props.route.params.item)
  const [store, setStore] = useState('')
  const [seller, setSeller] = useState('')
  const [category, setCategory] = useState('')
  const [time, setTime] = useState(new Date(props.route.params.item.creation.seconds * 1000))

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
  }, [props.route.params.item, props.cart.items, props.wishlist.items, props.gui.cart.items, props.gui.wishlist.items])

  return (
    <ScrollView style={{flex: 1}}>
    <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image resizeMode={"contain"} style={styles.image} source={{ uri: item.downloadURL }} />
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{item.title}</Text>
            <TouchableOpacity onPress={() => {
              if(item.store != firebase.auth().currentUser.uid){
                  firebase.firestore()
                  .collection("Logs")
                  .add({
                      time: firebase.firestore.FieldValue.serverTimestamp(),
                      user: firebase.auth().currentUser.uid,
                      userRole: "Customer",
                      object: item.store,
                      objectType: "Store",
                      on: "Store",
                      action: "Visited",
                      actionType: "Read"
                  }).then((snap)=> {
                      firebase.firestore()
                      .collection("Activity")
                      .doc(firebase.auth().currentUser.uid)
                      .collection("Logs")
                      .add({
                          time: firebase.firestore.FieldValue.serverTimestamp(),
                          subject: firebase.auth().currentUser.uid,
                          subjectType: "Customer",
                          object: item.store,
                          objectType: "Store",
                          action: "Visited",
                          actionType: "Read"
                      }).then((snap) => {
                          firebase.database()
                          .ref('store')
                          .child(item.store)
                          .child('visits')
                          .set(firebase.database.ServerValue.increment(1))
                          .then((result) => console.log("Done"))
                          firebase.database()
                          .ref('store')
                          .child(item.store)
                          .child("History")
                          .set({
                            [months[new Date().getMonth()]+":"+new Date().getFullYear().toString()]: firebase.database.ServerValue.increment(1)
                          })
                          .then((result) => console.log("Done"))
                      }).catch((error) => console.error(error))
                  }).catch((error) => console.error(error))
              }
              props.navigation.navigate("Store", {id: item.store})
              }}>
              <Text style={styles.store}>{store} ({seller})</Text>
            </TouchableOpacity>
            <Text style={styles.description}>{category}</Text>
            <Text>Rating: {item.rating}</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{item.description}</Text>
          </View>
          <View style={styles.extraDetailsContainer}>
            <Text>Quality: {item.quality}</Text>
            <Text>In Stock: {item.quantity}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${item.price}</Text>
          </View>
          <View style={styles.buttonContainer}>
            {(item.store == firebase.auth().currentUser.uid)?
            (
              <Button color={"#D2042D"}  title={"Can't BUY"} />
            ):(
              (addedInCart)?(
                  <Button color={"#D2042D"} onPress={RemoveItemFromCart} title={"Remove From Cart"} />
                ): (
                  <Button color={"#C1C2FA"} onPress={AddItemToCart} title={"Add To Cart"} />
                )
            )}
            
          </View>
          <View style={styles.extraDetailsContainer}>
            <Text style={styles.creation}>{time.toDateString()}</Text>
          </View>
        </View>
    </View>
    </ScrollView>
  )
}
const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: '#ddd',
        shadowRadius: 25,
        margin: 20,
    },
    imageContainer: {
      flex: 1,
      padding: 20,
    },
    image: {
      height: 500,
      width: 500
    },
    detailsContainer: {
      flex: 1,
      // alignSelf: 'flex-start'
    },
    header: {
      padding: 10,
      marginBottom: 20,
    },
    title: {
      color: '#453284',
      fontSize: 32,
      fontWeight: '500'
    },
    store: {
      color: '#F5A922',
      fontSize: 24,
      fontWeight: '400'
    },
    descriptionContainer: {
      padding: 10,
      marginBottom: 20,
    },
    description: {
      color: "#B4B4E6",
      fontSize: 14,
      fontWeight: '200'
    },
    extraDetailsContainer: {
      padding: 10,
      marginBottom: 20,
    },
    priceContainer: {
      padding: 10,
      marginBottom: 20,
    },
    price: {
      fontSize: 32,
      fontWeight: '300'
    },
    buttonContainer: {
      padding: 10,
      marginBottom: 20,
      width: '50%'
    },
    creation: {
      fontSize: 14,
      fontWeight: '200',
      color: '#999'
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

export default connect(mapStateToProps, mapDispatchProps)(ProductDetailsScreen)
