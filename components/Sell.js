import React, { Component } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CategoryView from './main/CategoryView';
import Home from './main/Home';
import ProductView from './main/ProductView';
import { View, Button, Image, Text } from 'react-native';
import { lineHeight } from 'styled-system';
import firebase from 'firebase';
import {
  useFonts,
  Asap_400Regular,
} from "@expo-google-fonts/dev";

export default class Sell extends Component {
    constructor(props) {
        super()
        this.state = {
        loaded: false,
        }
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            this.setState({
            loggedIn: false,
            loaded: true,
            })
        } else {
            this.setState({
            loggedIn: true,
            loaded: true,
            });
        }
        });
    }
    render(){
        const { loggedIn, loaded } = this.state;
        if(!loggedIn){
            return (
                <SafeAreaProvider>
                    <Home navigation={this.props.navigation} isActive={false}/>
                    <View style={{display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'space-evenly', alignItems: 'center'}}>
                        <View>
                            <Text style={{fontSize: 80, fontWeight: 'bold', lineHeight: '96px', fontFamily: 'Asap_400Regular,sans-serif'}}>Become an</Text>
                            <Text style={{fontSize: 80, fontWeight: 'bold', lineHeight: '96px', fontFamily: 'Asap_400Regular,sans-serif'}}>Emporium Seller</Text>
                            <Text>More than half the units sold in our stores are from independent sellers.</Text>
                            <Button title='Sign up' onPress={()=> this.props.navigation.navigate('Signin')}/>
                        </View>
                        <Image source={{uri: require('../images/prime-boxes-2.png') }} style={{right: 0, height: 300, width: 300, resizeMode: 'center'}}/>
                    </View>
                </SafeAreaProvider>
            );
        }
        if(loggedIn){
            return (
                <SafeAreaProvider>
                    <Home navigation={this.props.navigation} isActive={false} />
                    <View style={{display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'space-evenly', alignItems: 'center'}}>
                        <View>
                            <Text style={{fontSize: 80, fontWeight: 'bold', lineHeight: '96px', fontFamily: 'Asap_400Regular,sans-serif'}}>Welcome to</Text>
                            <Text style={{fontSize: 80, fontWeight: 'bold', lineHeight: '96px', fontFamily: 'Asap_400Regular,sans-serif'}}>Emporium Sell Department</Text>
                            <Text>More than half the units sold in our stores are from independent sellers.</Text>
                            <Button title='Seller Dashboard' onPress={()=> this.props.navigation.navigate('SellerDashboard')}/>
                        </View>
                    </View>
                </SafeAreaProvider>
            )
        }
    }
}
