import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, Button, ScrollView } from 'react-native'

import { Dimensions } from "react-native";

export default function Landingscreen(props) {
    const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width);
    useEffect(() => {
        setScreenWidth(Dimensions.get("window").width)
    }, [Dimensions.get("window").width])

    if(Dimensions.get("window").width <= 580){
        return (
            <View style={mstyles.container}>
                <View style={{flex: 1, height: '50%'}}>
                    <View style={mstyles.imageContainer}>
                        <Image resizeMode="contain" style={mstyles.image} source={{uri: require("../../images/greetings.jpg")}} />
                    </View>
                </View>
                <View style={{flex: 1, height: '50%'}}>
                        <View style={mstyles.titleContainer}>
                            <Text style={mstyles.title}>WELCOME</Text>
                        </View>
                        <View style={mstyles.subtitleContainer}>
                            <Text style={mstyles.subtitle}>LOREM IPSUM</Text>
                        </View>
                        <View style={mstyles.infoContainer}>
                            <Text style={mstyles.info}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, 
                                pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus. 
                                Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, 
                                in pretium orci vestibulum eget.
                            </Text>
                        </View>
                        <View style={mstyles.buttonContainer}>
                            <Button onPress={() => props.navigation.navigate("Signin")} color={"#C1C2FA"} title="Continue" />
                        </View>
                </View>
            </View>
        )
    }
    return (
        <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={styles.container}>
            <View style={styles.detailsContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>WELCOME</Text>
                    </View>
                    <View style={styles.subtitleContainer}>
                        <Text style={styles.subtitle}>LOREM IPSUM</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.info}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, 
                            pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus. 
                            Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, 
                            in pretium orci vestibulum eget.
                        </Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button onPress={() => props.navigation.navigate("Signin")} color={"#C1C2FA"} title="Continue" />
                    </View>
            </View>
            <View style={styles.imageContainer}>
                <Image resizeMode="contain" style={styles.image} source={{uri: require("../../images/greetings.jpg")}} />
            </View>
        </View>
        </ScrollView>
    )
}

const mstyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        height: '100%'
    },
    innerContainer: {
        flex: 1,
        height: '100%'
    },
    detailsContainer: {
        flex: 1,
    },
    titleContainer: {
    },
    title: {
        color: '#453284',
        fontSize: 36,
        fontWeight: 'bold'
    },
    subtitleContainer: {
    },
    subtitle: {
        color: '#F5A922',
        fontSize: 22,
        fontWeight: 'bold'
    },
    infoContainer: {
        paddingVertical: 10,
    },
    info: {
        color: "#B4B4E6",
        fontSize: 12,
    },
    buttonContainer: {
    },
    imageContainer: {
        flex: 1,
    },
    image: {
        flex: 1,
        width: '100%',
    }
})


const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    detailsContainer: {
        flex: 1,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 10,
        paddingLeft: 100,
    },
    titleContainer: {
        padding: 10,
    },
    title: {
        color: '#453284',
        fontSize: 64,
        fontWeight: 'bold'
    },
    subtitleContainer: {
        padding: 10,
    },
    subtitle: {
        color: '#F5A922',
        fontSize: 24,
        fontWeight: 'bold'
    },
    infoContainer: {
        padding: 10,
        width: '75%'
    },
    info: {
        color: "#B4B4E6",
        fontSize: 14,
    },
    buttonContainer: {
        padding: 10,
    },
    imageContainer: {
        flex: 1,
    },
    image: {
        height: 500,
        width: 500,
    }
})
