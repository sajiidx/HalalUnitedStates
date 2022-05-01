import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

function truncateString(str, num) {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
}

export default function OrderedItem({item}) {
    return (
        <View style={styles.container}>
            <View style={styles.detailsContainer}>
                <View style={styles.titleContainer}>
                    <View style={styles.imageContainer}>
                        <Image source={{uri: item.downloadURL}} style={styles.image} />
                    </View>
                    <Text style={styles.title}>{truncateString(item.title, 25)}</Text>
                </View>
                <View style={styles.clicksContainer}>
                    <Text style={styles.clicks}> + {item.qont}</Text>
                </View>
                <View style={styles.clicksContainer}>
                    <Text style={styles.clicks}>${item.price}</Text>
                </View>
                <View style={styles.clicksContainer}>
                    <Text style={styles.clicks}>${parseFloat(item.price) * parseFloat(item.qont)}</Text>
                </View>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderTopColor: '#ddd',
        borderTopWidth: 1,
    },
    imageContainer: {
        margin: 10,
        borderRadius: 2,
        overflow: 'hidden'
    },
    image: {
        width: 50,
        height: 50
    },
    detailsContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    title: {
        color: '#000',
        fontSize: 14,
        fontWeight: '700'
    },
    clicksContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    clicks: {
        color: '#000',
        fontSize: 14
    }
})
