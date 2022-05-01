import React, {useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import firebase from 'firebase'
import OrderedItems from './OrderedItems'
import CustomerAndOrderDetails from './CustomerAndOrderDetails'
import OrderBox from './OrderBox'

function getTime(seconds){
    var date = new Date(seconds * 1000)
    var hours = ''
    var minutes = ''
    if(date.getHours() < 10){
        hours += '0' + date.getHours().toString()
    } else {
        hours += date.getHours().toString()
    }
    if(date.getMinutes() < 10){
        minutes += '0' +  date.getMinutes().toString()
    } else{
        minutes += date.getMinutes().toString()
    }
    return hours + ":" + minutes;
}

export default function OrderDetails(props) {
    const [order, setOrder] = useState(props.route.params.order)
    const [address, setAddress] =  useState(props.route.params.order.address)
    const [summary, setSummary] = useState({
        "Order Created": new Date(order.creation.seconds * 1000).toDateString(),
        "Order Time": getTime(order.creation.seconds),
        "Subtotal": "$" + order.items.reduce((sum, x) => (x.store == firebase.auth().currentUser.uid)? sum + (parseFloat(x.price) * parseFloat(x.qont)): sum, 0).toString(),
        "Delivery Fee": "$0"
    })

    useEffect(() => {
    }, [])

    return (
        <View  style={{flex: 1}}>
            <ScrollView style={styles.body} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={{flex: 3}}>
                        <View style={styles.header}>
                            <Text style={styles.orderID}>ORDER ID # {order.id}</Text>
                        </View>
                        <View style={styles.orderedItemsContainer}>
                            <OrderedItems storeID={firebase.auth().currentUser.uid} products={order.items} />
                        </View>
                        <View style={styles.customerAndOrderDetials}>
                            <CustomerAndOrderDetails customer={props.route.params.customer} orderDetails={order}/>
                        </View>
                    </View>
                    <View style={{flex: 2, padding: 20}}>
                        <View style={styles.customerAndOrderDetials}>
                            <OrderBox data={summary} headerTitle={"Order Summary"} />
                        </View>
                        <View style={styles.customerAndOrderDetials}>
                            <OrderBox data={address} headerTitle={"Delivery Address"} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row'
    },
    body: {
        flex: 1,
        padding: 20,
    },
    header: {
        marginVertical: 10,
    },
    orderID: {
        color: '#000',
        fontSize: 24,
        fontWeight: '700'
    },
    orderedItemsContainer: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
    },
    customerAndOrderDetials: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
    }
})
