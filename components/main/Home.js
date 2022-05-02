import React, { Component, useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from "react-native";

import firebase from 'firebase';
import { Image } from 'react-native-elements';
import { Searchbar } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, loadCost, clearData } from '../../redux/actions';

function Home(props) {
    let page;
    if(props.isActive){
        page = 'SellerDashboard';
    }
    else{
        page = 'Home';
    }
    const [user, setUser] = useState({});
    const [search, setSearch] = useState('');

    useEffect(() => {
        props.fetchUser();
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
    },[]);

    return (
        <View style={{minHeight: 75, maxHeight: 100}}>
            <View style={{ zIndex: 55, justifyContent:'center', position: 'absolute', left: 0, right: 0, top: 0, backgroundColor: '#131921', flexDirection: 'row', alignItems: 'center'}}>
                <View style={{ justifyContent: 'center', alignItems: 'center' ,width: 100, height: 40, margin: 5, marginHorizontal: 10}}>
                    <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>L O G O M E</Text>
                    {/* <Image source={{uri: require('../../images/amazon-log.png')}} style={{ tintColor: 'white', height: 50, width: 100, resizeMode: 'center'}} /> */}
                </View>
                <TouchableOpacity>
                    <View style={{ justifyContent: 'center', width: 100, backgroundColor: '#e7e7eb', height: 40, borderRadius: 4, paddingHorizontal: 10 }}>
                        <Text style={{ fontSize: 12 }}>Deliver to</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 12 }}>United States</Text>
                    </View>
                </TouchableOpacity>
                <View style={{ flex: 0.8, margin: 5, height: '80%', justifyContent: 'center' }}>
                    <Searchbar
                        style={{height: 40}}
                        placeholder="Search"
                        onChangeText={(search) => setSearch(search)}
                        value={search}
                    />
                </View>
                <View style={{flex: 0.15}}> 

                </View>
                
                { firebase.auth().currentUser ? (
                    <TouchableOpacity style={{marginHorizontal: 5}} onPress={()=> props.navigation.navigate('AccountContainer')}>
                        <View style={{ justifyContent: 'center', width: 130, backgroundColor: '#e7e7eb', height: 40, borderRadius: 4, paddingHorizontal: 5}}>
                            <Text style={{ fontSize: 12 }}>Hello, { user.first_name }</Text>
                            <Text style={{ fontWeight: 'bold' }}>Account & Lists</Text>
                        </View>
                    </TouchableOpacity>
                ):(
                    <TouchableOpacity style={{marginHorizontal: 5}} onPress={()=> props.navigation.navigate('Signin')}>
                        <View style={{ justifyContent: 'center', width: 130, backgroundColor: '#e7e7eb', height: 40, borderRadius: 4, paddingHorizontal: 5}}>
                            <Text style={{ fontSize: 12 }}>Hello, Sign in</Text>
                            <Text style={{ fontWeight: 'bold' }}>Account & Lists</Text>
                        </View>
                    </TouchableOpacity>
                )}

                <TouchableOpacity>
                    <View style={{ justifyContent: 'center', width: 100, backgroundColor: '#e7e7eb', height: 40, borderRadius: 4, paddingHorizontal: 5}}>
                        <Text style={{ fontSize: 12 }}>Return</Text>
                        <Text style={{ fontWeight: 'bold' }}>& Orders</Text>
                    </View>
                </TouchableOpacity>
                
                <TouchableOpacity style={{marginHorizontal: 10, right: 0}} onPress={()=> {
                    props.loadCost()
                    props.navigation.navigate("Cart")}
                    }>
                    <View>
                        <Image source={{ uri: require('../../images/chart2x.png') }}
                            style={{ width: 30, height: 30, tintColor: 'white' }}
                        />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', padding: 5 , position: 'absolute', left: 0, right: 0, top: 50, height: 30, backgroundColor: '#232f3e'}}>
                <TouchableOpacity>
                    <Text style={{color:'white', fontWeight: 'bold', fontSize: 14, marginHorizontal: 10}}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{color:'white', fontSize: 14, marginHorizontal: 10}}>Today's Deal</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{color:'white', fontSize: 14, marginHorizontal: 10}}>Customer Service</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{color:'white', fontSize: 14, marginHorizontal: 10}}>Gift Cards</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.navigate("Wishlist")}>
                    <Text style={{color:'white', fontSize: 14, marginHorizontal: 10}}>Wishlist</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => props.navigation.navigate("Inventory")}>
                    <Text style={{color:'white', fontSize: 14, marginHorizontal: 10}}>Sell</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser, clearData, loadCost }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Home);