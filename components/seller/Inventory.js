import React, { Component } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, clearData } from '../../redux/actions/index';

import AddProduct from '../product/Add';
import UpdateProduct from '../product/Update';
import DeleteProduct from '../product/Delete';

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
    return (null)
}

export class Main extends Component {
    componentDidMount() {
        this.props.fetchUser();
        // this.props.fetchUserPosts();
        // this.props.fetchUserFollowing();
    }
    render() {
        return (
            <Tab.Navigator initialRouteName="AddProduct" labeled={false}>
                <Tab.Screen name="AddProduct" component={AddProduct}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="plus-box" color={color} size={26} />
                        ),
                }} />
                <Tab.Screen name="UpdateProduct" component={UpdateProduct}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="update" color={color} size={26} />
                        ),
                    }} />
                <Tab.Screen name="DeleteProduct" component={DeleteProduct} navigation={this.props.navigation}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="minus" color={color} size={26} />
                        ),
                }} />
            </Tab.Navigator>
        )
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser,  clearData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);