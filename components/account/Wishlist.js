import React, { Component, useState, useEffect } from 'react';
import { View, Text, FlatList, Image, Button, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from 'firebase';
require("firebase/firestore");
import { loadWishlistGUI } from '../../redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function truncateString(str, num) {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
}
  

function Wishlist(props) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(props.gui.wishlist.items);
    }, [props.gui]);

    const renderItem = function({ item }){
        return (
            <View key={item.id} style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={{uri: item.downloadURL}} style={styles.image} />
                </View>
                <View style={{flex: 1}}>
                    <View style={styles.productDetails}>
                        <Text style={styles.title}>{truncateString(item.title, 25)}</Text>
                        <Text style={styles.price}>${item.price}</Text>
                    </View>
                    <View style={styles.productDetails}>
                        <Text style={{marginVertical: 5}}>{truncateString(item.description , 125)}</Text>
                    </View>
                    <View style={styles.actionsContainer}>
                        <TouchableOpacity>
                            <MaterialCommunityIcons name="cart-off" size={32} color={"darkgrey"} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <MaterialCommunityIcons name="heart" size={32} color={"red"} />
                        </TouchableOpacity>
                    </View>
                </View>                
            </View>
        );
    }
    return (
        <View style={{flex: 1, backgroundColor: '#fff', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            { products.length == 0 ? (
                <View>
                    <Text>Nothing Here</Text>
                </View>
            ) : (
            <FlatList
                style={{width: '100%'}}
                data={products}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        margin: 10,
        borderRadius: 5,
        overflow: 'hidden',
        shadowColor: '#ddd',
        shadowRadius: 5,
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
    gui: store.userState.gui
})

const mapDispatchProps = (dispatch) => bindActionCreators({loadWishlistGUI}, dispatch);
export default connect(mapStateToProps, mapDispatchProps)(Wishlist);
