import React, { useState, useEffect } from 'react';
import { Text, View, Button, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from 'firebase';
import Product from '../main/Product';
require('firebase/firestore');

export default function Delete(props) {
    const [storeID, setStoreID] = useState(props.route.params.store)
    const [timeout, setTimeout] = useState(false);
    const [products, setProducts] = useState([])

    useEffect(() => {
        if(storeID){
            firebase.firestore()
            .collection("Products")
            .where("store", "==", storeID)
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
    }, [])

    if(!timeout && products.length == 0){
        return (
            <View style={styles.container}>
                <ActivityIndicator size={32} color={'#111'}/>
            </View>
        )
    } else if(timeout && products.length == 0){
        return (
            <View style={styles.container}>
                <Text>Nothing To Show!</Text>
            </View>
        )
    }

    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
            <FlatList
                style={{flex: 1}}
                data={products}
                renderItem={({item}) => <Product navigation={props.navigation} item={item} sdel={true}/>}
                keyExtractor={(item, index) => index.toString()}
                numColumns={4}
            />
        </View>
    )
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

