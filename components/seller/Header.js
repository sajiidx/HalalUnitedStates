import React, { Component, useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from "react-native";

import firebase from 'firebase';
import { Image } from 'react-native-elements';
import { Searchbar } from 'react-native-paper';

export default function Header({ navigation }) {    
    const [user, setUser] = useState({});
    const [search, setSearch] = useState('');

    useEffect(() => {
        if(firebase.auth().currentUser){
            firebase.firestore()
                .collection("Customers")
                .doc(firebase.auth().currentUser.uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        setUser(snapshot.data());
                    }
                    else {
                        console.log('does not exist')
                    }
                })
                .catch((error)=>{
                    console.log(error);
                })
        }
        console.log(search);
    },[]);

    return (
        <View style={{minHeight: 60, maxHeight: 75, border: '1px #ddd solid', backgroundColor: '#f6f6f6'}}>
            <View style={{ zIndex: 55, justifyContent:'space-between', position: 'absolute', left: 0, right: 0, top: 0, backgroundColor: '#F6F6F6', flexDirection: 'row', alignItems: 'center'}}>
                <View style={{width: 100, height: 25, margin: 5, marginHorizontal: 10}}>
                    <Image source={{uri: require('../../images/amazon-log.png')}} style={{ tintColor: 'black', height: 20, width: 40, resizeMode: 'center'}} />
                </View>
                <View style={{ flex: 0.3, margin: 5, height: '50%', justifyContent: 'center' }}>
                    <Searchbar
                        style={{height: 20}}
                        placeholder="Search"
                        onChangeText={(search) => setSearch(search)}
                        value={search}
                    />
                </View>
                <View style={{flex: 0.15}}> 

                </View>
                
                { firebase.auth().currentUser ? (
                    <TouchableOpacity style={{marginHorizontal: 5}} onPress={()=> navigation.navigate('AccountContainer')}>
                        <View style={{ justifyContent: 'center', width: 130, backgroundColor: '#e7e7eb', height: 25, borderRadius: 4, paddingHorizontal: 5}}>
                            <Text style={{ fontSize: 10 }}>Hello, { user.first_name }</Text>
                            <Text style={{ fontWeight: 'bold' }}>Account & Lists</Text>
                        </View>
                    </TouchableOpacity>
                ):(
                    <TouchableOpacity style={{marginHorizontal: 5}} onPress={()=> navigation.navigate('Signin')}>
                        <View style={{ justifyContent: 'center', width: 130, backgroundColor: '#e7e7eb', height: 25, borderRadius: 4, paddingHorizontal: 5}}>
                            <Text style={{ fontSize: 10 }}>Hello, Sign in</Text>
                            <Text style={{ fontWeight: 'bold' }}>Account & Lists</Text>
                        </View>
                    </TouchableOpacity>
                )}
            </View>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', padding: 5 , position: 'absolute', left: 0, right: 0, top: 30, height: 25, backgroundColor: '#F6F6F6'}}>
                <TouchableOpacity>
                    <Text style={{color:'gray', fontSize: 14, marginHorizontal: 10}}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{color:'gray', fontSize: 14, marginHorizontal: 10}}>CATALOG</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('Inventory')}>
                    <Text style={{color:'gray', fontSize: 14, marginHorizontal: 10}}>INVENTORY</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{color:'gray', fontSize: 14, marginHorizontal: 10}}>PRICING</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{color:'gray', fontSize: 14, marginHorizontal: 10}}>ORDERS</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{color:'gray', fontSize: 14, marginHorizontal: 10}}>ADVERTISING</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{color:'gray', fontSize: 14, marginHorizontal: 10}}>REPORTS</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{color:'gray', fontSize: 14, marginHorizontal: 10}}>PERFORMANCE</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text style={{color:'gray', fontWeight: 'bold', fontSize: 14, marginHorizontal: 10}}>HOME</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}