import React, { Component } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
    fetchCartItems,
    fetchWishlistItems,
    fetchUser,
    clearData,
    loadWishlistGUI,
    loadCartGUI,
    fetchOrders,
    fetchStoreProducts
} from '../redux/actions/index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AccountScreen from './account/Account';
import OrderScreen from './account/Order';
import RecommendationsScreen from './account/Recommendations';
import BrowsingHistoryScreen from './account/BrowsingHistory';
import WishlistScreen from './account/Wishlist';
import ProfileScreen from '../screens/ProfileScreen';
import UsersProducts from '../screens/UsersProducts';

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
    return (null)
}

class AccountContainer extends Component {
    constructor(props){
        super();
    }
    componentDidMount() {
        this.props.fetchUser();
        this.props.fetchWishlistItems();
        this.props.loadWishlistGUI();
        this.props.loadCartGUI();
        this.props.fetchCartItems();
        this.props.fetchOrders();
        this.props.fetchStoreProducts(firebase.auth().currentUser.uid);
    }
    render() {
        return (
            <Tab.Navigator initialRouteName="Account" labeled={false}>
                <Tab.Screen name="Account" component={ProfileScreen}
                    options={{
                        tabBarIcon: ({color, size}) => (
                            <MaterialCommunityIcons name="account-circle" color={color} size={26} />
                        ),
                    }}
                    // listeners={({ navigation }) => ({
                    //     tabPress: event => {
                    //         event.preventDefault();
                    //         navigation.navigate("Account", {uid: firebase.auth().currentUser.uid, navigation})
                    //     }})}
                />
                <Tab.Screen name="Store" component={UsersProducts}
                    options={{
                        tabBarIcon: ({color, size}) => (
                            <MaterialCommunityIcons name="store" color={color} size={26} />
                        ),
                    }}
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            event.preventDefault();
                            navigation.navigate("Store", {store: firebase.auth().currentUser.uid, navigation})
                        }})}
                />
                <Tab.Screen name="Order" component={OrderScreen} navigation={this.props.navigation}
                    options={{
                        tabBarIcon: ({color, size}) => (
                            <MaterialCommunityIcons name="clipboard-list" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen name="Wishlist" component={WishlistScreen}
                    options={{
                        tabBarIcon: ({color, size}) => (
                            <MaterialCommunityIcons name="heart" color={color} size={26} />
                        ),
                    }}
                />
            </Tab.Navigator>
        )
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({
    fetchCartItems,
    fetchWishlistItems,
    loadWishlistGUI,
    loadCartGUI,
    fetchUser,
    clearData,
    fetchOrders,
    fetchStoreProducts
}, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(AccountContainer);