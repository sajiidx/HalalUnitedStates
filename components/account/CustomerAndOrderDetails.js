import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import CustomerAndOrderDetail from './CustomerAndOrderDetail'
import OrderedItem from './OrderedItem'

function header(props){
    return (
      <View style={styles.headerContainer}>
          <View style={styles.firstColumnHeader}>
            <Text style={styles.headerText}>Customer And Order Details</Text>
          </View>
      </View>
    )
}

export default function CustomerAndOrderDetails({orderDetails, customer}) {
    const [details, setDetails] = useState([])
    console.log(orderDetails)
    useEffect(() => {
        let address = Object.keys(orderDetails.address).map((key) => {
            if(key == 'zip'){
                return "";
            }
            return key.toString() + ": " + orderDetails.address[key].toString();
        }).join(" ")
        setDetails([
            { key: "Customer", value: customer.first_name },
            { key: "Email", value: customer.email },
            { key: "Phone Number", value: orderDetails.phone },
            { key: "Order Date", value: new Date(orderDetails.creation.seconds * 1000).toDateString()},
            { key: "Payment Method", value: 'On Delivery'},
            { key: "Note", value: orderDetails.note}
        ])        
    }, [])
    return (
        <View style={styles.container}>
            <FlatList
                data={details}
                renderItem={({item}) => <CustomerAndOrderDetail item={item} />}
                keyExtractor={(item, index) => item.key}
                ListHeaderComponent={header}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    headerContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },
    headerText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000'
    },
    firstColumnHeader: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    columnHeader: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})