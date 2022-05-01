import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import OrderedItem from './OrderedItem'

function header(props){
    return (
      <View style={styles.headerContainer}>
          <View style={styles.firstColumnHeader}>
            <Text style={styles.headerText}>Items Summary</Text>
          </View>
          <View style={styles.columnHeader}>
            <Text style={styles.headerText}>QTY</Text>
          </View>
          <View style={styles.columnHeader}>
            <Text style={styles.headerText}>Price</Text>
          </View>
          <View style={styles.columnHeader}>
            <Text style={styles.headerText}>Total Price</Text>
          </View>
      </View>
    )
}

export default function OrderedItems({products, storeID}) {
    return (
        <View style={styles.container}>
            <FlatList
                data={products.filter((value, index) => value.store == storeID)}
                renderItem={({item}) => <OrderedItem item={item} />}
                keyExtractor={(item, index) => item.id}
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