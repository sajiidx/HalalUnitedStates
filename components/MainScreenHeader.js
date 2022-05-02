import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, loadCost, clearData } from '../redux/actions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Searchbar } from 'react-native-paper';
import {} from 'react-native-elements'

export function MainScreenHeader(props) {
    const [search, setSearch] = useState('');
    useEffect(() => {
        props.fetchUser();
    })
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <View style={styles.logoContianer}>
                    <Text style={styles.logome}>LOGOME</Text>
                </View>
            </View>
            <View style={styles.searchBarContainer}>
                <Searchbar
                    style={{height: 40}}
                    placeholder="Search"
                    onChangeText={(search) => setSearch(search)}
                    value={search}
                />
            </View>
            <View style={styles.rightContainer}>
                <View style={styles.navigationOptionsContainer}>
                    <TouchableOpacity style={{marginHorizontal: 10}} onPress={()=> props.navigation.navigate("Inventory")}>
                        <MaterialCommunityIcons name="upload" color={'#fff'} size={26} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginHorizontal: 10}} onPress={()=> props.navigation.navigate("Wishlist")}>
                        <MaterialCommunityIcons name="heart" color={'#fff'} size={26} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginHorizontal: 10}} onPress={()=> {
                        props.loadCost()
                        props.navigation.navigate("Cart")
                    }}>
                        <MaterialCommunityIcons name="cart" color={'#fff'} size={26} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: 10}} onPress={()=> props.navigation.navigate('AccountContainer')}>
                        <MaterialCommunityIcons name="account" color={'#fff'} size={26} />
                    </TouchableOpacity>
                </View>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#131921',
        padding: 20
    },
    leftContainer: {
        marginRight: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    rightContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    logoContianer: {
    },
    logome: {
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1.5,
        color: '#fff',
    },
    searchBarContainer: {
        flex: 1,
    },
    navigationOptionsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    }
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({
    fetchUser,
    clearData,
    loadCost
}, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(MainScreenHeader);
