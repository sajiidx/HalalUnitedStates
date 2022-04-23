import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import TotalCost from '../TotalCost'
import { connect } from 'react-redux';

export function OrderSummary({items, cost, navigation}) {
    const [deliveryFee, setDeliveryFee] = useState(20)
    useEffect(() => {
    }, [cost, items])
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerText}>ORDER SUMMARY</Text>
        </View>
        <View style={styles.detailsContainer}>
            <View style={styles.row}>
                <Text style={styles.rcell}>{items.reduce(function (acc, obj) { return acc + obj.qont; }, 0)} items</Text>
                <Text style={styles.lcell}>${(cost)? cost.toFixed(2) : NaN}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.rcell}>Delivery fee</Text>
                <Text style={styles.lcell}>${deliveryFee}</Text>
            </View>
        </View>
        <View style={styles.totalCostContainer}>
            <Text style={styles.totalCostText}>Total Cost</Text>
            <Text style={styles.totalCost}>${(cost)? (cost + deliveryFee).toFixed(2) : NaN}</Text>
        </View>
        <View>
            <Button color={"#282828"} title={"Proceed to checkout"} onPress={() => {
                navigation.navigate('Checkout', {cost, items})
            }} />
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: '10%'
    },
    header: {
        marginVertical: 10
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#111'
    },
    detailsContainer: {

    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    rcell: {
        fontSize: 20,
    },
    lcell: {
        fontSize: 20,
        alignSelf: 'flex-end'
    },
    totalCostContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
    },
    totalCostText: {
        fontSize: 24,
    },
    totalCost: {
        fontSize: 28,
        alignSelf: 'flex-end'
    }
})

const mapStateToProps = (store) => ({
    cost: store.userState.cost
})

export default connect(mapStateToProps, null)(OrderSummary);
