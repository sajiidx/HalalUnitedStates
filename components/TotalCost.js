import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import { connect } from 'react-redux';

export function TotalCost(props) {
    const [cost, setCost] = useState(props.cost)
    useEffect(() => {
        setCost(props.cost);
        console.log(props.cost);
    }, [props.cost])
  return (
    <View style={styles.container}>
        <View style={styles.box}>
            <View style={styles.contain}>
                <Text style={styles.price}>Total: ${cost.toFixed(2)}</Text>
            </View>
            <View style={styles.contain}>
                <Button color={"#282828"} title='Order Now' />
            </View>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    box: {
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    price: {
        fontSize: 32,
        fontWeight: '300'
    },
    contain: {
        padding: 10
    }
})
const mapStateToProps = (store) => ({
    cost: store.userState.cost
})

export default connect(mapStateToProps, null)(TotalCost);
