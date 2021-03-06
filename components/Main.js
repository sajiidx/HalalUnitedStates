import React from 'react';
import CategoryView from './main/CategoryView';
import Home from './main/Home';
import ProductView from './main/ProductView';
import { View, StyleSheet, ScrollView } from 'react-native';

import {
  fetchCartItems,
  fetchWishlistItems,
  loadCartGUI,
  loadWishlistGUI,
  loadCost,
  fetchProfile,
  fetchStoreProducts
} from '../redux/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Dimensions } from "react-native";
import { styles } from 'styled-system';

class Main extends React.Component {

  componentDidMount(){
    this.props.fetchWishlistItems();
    this.props.fetchCartItems();
    this.props.loadCartGUI();
    this.props.loadWishlistGUI();
    this.props.fetchProfile();
  }
  
  render(){
    if(Dimensions.get("window").width <= 580){
      return (
        <View style={mstyles.container}>
          <ScrollView style={{flex: 1}} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            <View style={{flex: 1}}>
              <ProductView navigation={this.props.navigation}/>
            </View>
          </ScrollView>
        </View>
    )
    }
    return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <View style={{width: '15%', left: 0}}>
          <CategoryView navigation={this.props.navigation}/>
        </View>
        <View style={{width: '85%', right: 0}}>
          <ProductView navigation={this.props.navigation}/>
        </View>
      </View>
    </View>
    
  );
  }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    wishlist: store.userState.wishlist,
    cart: store.userState.cart,
    gui: store.userState.gui
})
const mapDispatchProps = (dispatch) => bindActionCreators({
  fetchWishlistItems,
  fetchCartItems,
  loadCartGUI,
  loadWishlistGUI,
  loadCost,
  fetchProfile
}, dispatch);

const mstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  }
})

export default connect(mapStateToProps, mapDispatchProps)(Main);


//https://fonts.google.com/icons?selected=Material+Icons