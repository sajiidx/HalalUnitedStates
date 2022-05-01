import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import CustomerAndOrderDetail from './CustomerAndOrderDetail'
import OrderedItem from './OrderedItem'
import RenderOrderBoxData from './RenderOrderBoxData'

function Header({headerTitle}){
    return (
      <View style={styles.headerContainer}>
          <View style={styles.firstColumnHeader}>
            <Text style={styles.headerText}>{headerTitle}</Text>
          </View>
      </View>
    )
}

export default function OrderBox({data, headerTitle}) {
    const [details, setDetails] = useState(Object.keys(data).map((key) => { return { key: key.toString(), value: data[key].toString() } }))
    useEffect(() => {
        
    }, [])
    return (
        <View style={styles.container}>
            <FlatList
                data={details}
                renderItem={({item}) => <RenderOrderBoxData item={item} />}
                keyExtractor={(item, index) => item.key}
                ListHeaderComponent={(props) => <Header headerTitle={headerTitle}/>}
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