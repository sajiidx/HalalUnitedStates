import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

export default function RenderOrderBoxData({item}) {
    return (
        <View style={styles.container}>
            <View style={styles.detailsContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{item.key}</Text>
                </View>
                <View style={styles.clicksContainer}>
                    <Text style={styles.clicks}>{item.value}</Text>
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
        padding: 5,
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
        alignItems: 'flex-end'
    },
    clicks: {
        color: '#000',
        fontSize: 14
    }
})
