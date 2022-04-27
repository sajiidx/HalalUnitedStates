import React, {useState} from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function OrderListHeader() {
    console.log("Sajid Ali")
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.cell}>Order ID</Text>
            </View>
            <View style={styles.box}>
                <Text style={styles.cell}>Customer</Text>
            </View>
            <View style={styles.box}>
                <Text style={styles.cell}>Items</Text>
            </View>
            <View style={styles.box}>
                <Text style={styles.cell}>Creation Time</Text>
            </View>
            <View style={styles.box}>
                <Text style={styles.cell}>Status</Text>
            </View>
            <View style={styles.box}>
                <Text style={styles.cell}>Cost</Text>
            </View>
            <View style={styles.box}>
                <Text style={styles.cell}>Payment Method</Text>
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
        alignItems: 'center',
        backgroundColor: '#fff'
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
