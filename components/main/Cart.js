import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, Button, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
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
    removeWishlistItemFromGUI
} from '../../redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Counter from '../Counter';
import CartItem from './CartItem';
import TotalCost from '../TotalCost';
import OrderSummary from './OrderSummary';
// import NumericInput from 'react-native-numeric-input';
// import CounterInput from "react-native-counter-input";

function truncateString(str, num) {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
}

const screenWidth = Dimensions.get("window").width

function Cart(props) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(props.gui.cart.items);
    }, [props.gui, props.cost]);

    if(products.length == 0){
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
                <Text>Nothing Here</Text>
            </View>
        )
    }
    if(screenWidth <= 580){
        return (
            <View style={mstyles.container}>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={{flex: 1}}
                    data={products}
                    renderItem={({item}) => <CartItem item={item} />}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={() => (
                        <View style={{backgroundColor: '#E8E8E8', paddingBottom: 20}}>
                            <OrderSummary items={products} navigation={props.navigation} />
                        </View>
                    )}
                    
                />
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <View style={{flex: 4, backgroundColor: '#F5F5F5', Height: '100%'}}>
                <FlatList
                    style={{width: '100%'}}
                    data={products}
                    renderItem={({item}) => <CartItem item={item} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
            <View style={{flex: 2, backgroundColor: '#E8E8E8', height: "100%"}}>
                <OrderSummary items={products} navigation={props.navigation} />
            </View>
        </View>
    )
}

const mstyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5'
    },
    imageContainer: {
        margin: 0,
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 200,
        width: 200,
    },
    productDetails: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
        paddingHorizontal: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    price: {
        color: 'green',
        fontSize: 18,
        fontWeight: 'bold'
    },
    actionsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
        paddingHorizontal: 20,
        width: '100%'
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: '#F5F5F5',
    },
    imageContainer: {
        margin: 0,
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 200,
        width: 200,
    },
    productDetails: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
        paddingHorizontal: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    price: {
        color: 'green',
        fontSize: 18,
        fontWeight: 'bold'
    },
    actionsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
        paddingHorizontal: 20,
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
    removeWishlistItemFromGUI
}, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Cart);
