import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, loadCost, clearData } from '../redux/actions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export function ProductDetailsScreenHeaderRight(props) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=> {
                        props.loadCost()
                        props.navigation.navigate("Cart")
                    }}>
                        <MaterialCommunityIcons name="cart" color={'#000'} size={26} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    leftContainer: {
        flex: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    rightContainer: {
        flex: 2,
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
        marginRight: 10,
    },
    searchBarContainer: {
    },
    navigationOptionsContainer: {
        flex: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
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

export default connect(mapStateToProps, mapDispatchProps)(ProductDetailsScreenHeaderRight);
