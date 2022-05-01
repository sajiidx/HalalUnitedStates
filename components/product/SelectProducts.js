import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ActivityIndicator} from 'react-native'
import { Picker } from 'react-native-web';
import DropDownPicker from 'react-native-dropdown-picker';
import firebase from 'firebase';
import 'firebase/firestore';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    OnStoreProductSelectedForUpdateOperation
} from '../../redux/actions'

export function SelectProducts(props) {
    const [products, setProducts] = useState(props.currentStoreProducts.map((value) => {
        return {label: value.title, value: value.id}
    }));
    const [timeout, setTimeout] = useState(props.TimoutWhileLoadingCurrentStoreProducts);
    const [error, setError] = useState(props.ErrorWhileLoadingCurrentStoreProducts);

    const [selectedProduct, setSelectedProduct] = useState('')
    const [open, setOpen] = useState(false)
    const [product, setProduct] = useState(null)

    useEffect(() => {
        setProducts(props.currentStoreProducts.map((value) => {
            return {label: value.title, value: value.id}
        }))
    }, [
        props.currentStoreProducts,
        props.ErrorWhileLoadingCurrentStoreProducts,
        props.TimoutWhileLoadingCurrentStoreProducts,
    ])

    if(!timeout){
        return (
            <View style={styles.container}>
                <ActivityIndicator size={32} color={'#111'}/>
            </View>
        )
    } else if(timeout && error){
        return (
            <View style={styles.container}>
                <Text>Error Occured While Loading Store Products!</Text>
                <Text>{error.message}</Text>
            </View>
        )
    }
    else if(timeout && products.length == 0){
        return (
            <View style={styles.container}>
                <Text>Nothing To Show!</Text>
            </View>
        )
    }

    return (
        <View style={styles.xcontianer}>
            <Text>Products: </Text>
            <Picker
                itemStyle={styles.xcontianer}
                mode="dropdown"
                style={styles.DropDownPicker}
                selectedValue={selectedProduct}
                onValueChange={(value) => {
                    setSelectedProduct(value)
                    props.OnStoreProductSelectedForUpdateOperation(value)
                }}
            >
                {products.map((item, index) => (
                <Picker.Item
                    key={item.value}
                    color="#0087F0"
                    label={item.label}
                    value={item.value}
                    index={index}
                />
                ))}
            </Picker>
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
    xcontianer: {
        padding: 20,
    },
    DropDownPicker: {
        zIndex: 10000,
        backgroundColor: '#FFF'
    },
    DropDownPickerContainer: {
        zIndex: 10000,
        backgroundColor: '#FFF'
    }
})


const mapStateToProps = (store) => ({
    currentStoreProducts: store.userState.currentStoreProducts,
    TimoutWhileLoadingCurrentStoreProducts: store.userState.TimoutWhileLoadingCurrentStoreProducts,
    ErrorWhileLoadingCurrentStoreProducts: store.userState.ErrorWhileLoadingCurrentStoreProducts
})
const mapDispatchProps = (dispatch) => bindActionCreators({
    OnStoreProductSelectedForUpdateOperation
}, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(SelectProducts);