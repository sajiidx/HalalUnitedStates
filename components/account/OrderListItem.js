import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import firebase from 'firebase';

export default function OrderListItem({navigation, item}) {
    const [time, setTime] = useState(new Date(item.creation.seconds * 1000))
    const [customer, setCustomer] = useState(null)
    useEffect(() => {
        firebase.firestore()
        .collection("Customers")
        .doc(item.creator)
        .get()
        .then((result) => {
            setCustomer(result.data())
            console.log(result.data())
        }).catch((error) => alert(error))
    }, [])
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("OrderDetails", {order: item, customer})} style={styles.box}>
                <Text style={styles.cell}>{item.id}</Text>
            </TouchableOpacity>
            <View style={styles.box}>
                <Text style={styles.cell}>{(customer)? customer.first_name + " " + customer.last_name: item.creator}</Text>
            </View>
            <View style={styles.box}>
                <Text style={styles.cell}>{item.items.length}</Text>
            </View>
            <View style={styles.box}>
                <Text style={styles.cell}>{time.toDateString()}</Text>
            </View>
            <View style={styles.box}>
                <Text style={styles.cell}>Pending</Text>
            </View>
            <View style={styles.box}>
                <Text style={styles.cell}>${item.cost}</Text>
            </View>
            <View style={styles.box}>
                <Text style={styles.cell}>On Delivery</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    box: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cell: {
        padding: 5,
    }
})
