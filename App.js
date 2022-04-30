import React, { Component } from 'react';
import MainScreen from './components/Main';
import SellScreen from './components/Sell';
import SignupScreen from './components/auth/Signup';
import SigninScreen from './components/auth/Signin';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import firebase from 'firebase';
import {View, Text, ActivityIndicator} from 'react-native';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';
import AccountContainerScreen from './components/AccountContainer';
import SignoutScreen from './components/account/Signout';
import SellerDashboard from './components/SellerDashboard';
import InventoryScreen from './components/seller/Inventory';
import CartScreen from './components/main/Cart'
import Wishlist from './components/account/Wishlist';
import Landingscreen from './components/auth/Landingscreen';
import LandingScreenHeader from './components/LandingScreenHeader';
import ForgetPasswordscreen from './components/auth/ForgetPasswordscreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import CategoryProductsScreen from './screens/CategoryProductsScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import StoreScreen from './screens/StoreScreen';

const store = createStore(rootReducer, applyMiddleware(thunk));

const Stack = createStackNavigator();
console.reportErrorsAsExceptions = false;

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrxWcslAnar08WOWuiQFPLyiXATgUYrU0",
  authDomain: "fir-17375.firebaseapp.com",
  projectId: "fir-17375",
  storageBucket: "fir-17375.appspot.com",
  messagingSenderId: "1077678327291",
  appId: "1:1077678327291:web:b7a7c46055807d691b775e",
  measurementId: "G-JV2M2VMEBJ"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default class App extends Component {
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

        var userStatusDatabaseRef = firebase.database().ref('/status/' + user.uid);
        var isOfflineForDatabase = {
          state: 'offline',
          last_changed: firebase.database.ServerValue.TIMESTAMP,
        };
    
        var isOnlineForDatabase = {
            state: 'online',
            last_changed: firebase.database.ServerValue.TIMESTAMP,
        };
        var userStatusFirestoreRef = firebase.firestore().doc('/Stores/' + user.uid);
          var isOfflineForFirestore = {
              status: 'offline',
              last_changed: firebase.firestore.FieldValue.serverTimestamp(),
          };
          var isOnlineForFirestore = {
              status: 'online',
              last_changed: firebase.firestore.FieldValue.serverTimestamp(),
          };
          firebase.database().ref('.info/connected').on('value', function(snapshot) {
            if (snapshot.val() == false) {
                userStatusFirestoreRef.set(isOfflineForFirestore, {merge: true});
                return;
            };
            userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function() {
                userStatusDatabaseRef.set(isOnlineForDatabase);
                userStatusFirestoreRef.set(isOnlineForFirestore, {merge: true});
            });
          });
          this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    })
  }
  render(){
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={36} color={"#000"} />
        </View>
      )
    }
    if (!loggedIn) {
      return (
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={Landingscreen} options={{ header: (props) => <LandingScreenHeader navigation={props.navigation} />}}/>
              <Stack.Screen name="Signup" component={SignupScreen}/>
              <Stack.Screen name="Signin" component={SigninScreen}/>
              <Stack.Screen name='ForgetPassword' component={ForgetPasswordscreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      );
    }
    return (
      <Provider store={store}>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={MainScreen} options={{ headerShown: false }}/>
              <Stack.Screen name="Sell" component={SellScreen} options={{ headerShown: false }}/>
              <Stack.Screen name="AccountContainer" component={AccountContainerScreen}/>
              <Stack.Screen name="Signout" component={SignoutScreen} options={{ headerShown: false }} />
              <Stack.Screen name="SellerDashboard" component={SellerDashboard} options={{ headerShown: false }}/>
              <Stack.Screen name="Inventory" component={InventoryScreen}/>
              <Stack.Screen name="Cart" component={CartScreen}/>
              <Stack.Screen name="Wishlist" component={Wishlist}/>
              <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
              <Stack.Screen name="CategoryProducts" component={CategoryProductsScreen} />
              <Stack.Screen name="Checkout" component={CheckoutScreen} />
              <Stack.Screen name="Store" component={StoreScreen} />
            </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}
//https://fonts.google.com/icons?selected=Material+Icons