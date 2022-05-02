import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Button, Image, Platform} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { Dimensions } from "react-native";

export default function LandingScreenHeader({navigation}) {
    const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width);
    useEffect(() => {
        setScreenWidth(Dimensions.get("window").width)
    }, [Dimensions.get("window").width])

    if(screenWidth <= 580){
        return(
            <View style={mobile_styles.container}>
                <View style={mobile_styles.leftContainer}>
                    <Text style={mobile_styles.logome}>LOGOME</Text>
                </View>
                <View style={mobile_styles.rightContainer}>
                    <View style={mobile_styles.buttonContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate("Signin")} >
                            <Text style={mobile_styles.Text}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={mobile_styles.buttonContainer}>
                        <TouchableOpacity style={mobile_styles.signUpButtonContainer} onPress={() => navigation.navigate("Signup")} >
                            <Text style={mobile_styles.signUpText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                {/* <Image source={{uri: require("../images/logo.png")}} style={{width: 50, height: 50}} /> */}
                <Text style={styles.logome}>LOGOME</Text>
            </View>
            <View style={styles.rightContainer}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity>
                        <Text style={styles.Text}>Home</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity>
                        <Text style={styles.Text}>About</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity>
                        <Text style={styles.Text}>Service</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate("Signin")} >
                        <Text style={styles.Text}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.signUpButtonContainer} onPress={() => navigation.navigate("Signup")} >
                        <Text style={styles.signUpText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
  )
}

const mobile_styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    leftContainer: {
        flex: 1,
    },
    logome: {
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1.5,
        color: '#453284'
    },
    rightContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonContainer: {
    },
    Text: {
        fontSize: 14,
        fontWeight: '300',
        letterSpacing: 0.5
    },
    signUpButtonContainer: {
        padding: 5,
        borderRadius: 5,
        backgroundColor: '#C1C2FA',
        shadowColor: '#ddd',
        shadowRadius: 5
    },
    signUpText: {
        color: '#000'
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    leftContainer: {
        flex: 1,
        paddingLeft: 30,
    },
    logome: {
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1.5,
        color: '#453284'
    },
    rightContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    buttonContainer: {
        padding: 10,
    },
    Text: {
        fontSize: 14,
        fontWeight: '300',
        letterSpacing: 0.5
    },
    signUpButtonContainer: {
        padding: 5,
        borderRadius: 5,
        backgroundColor: '#C1C2FA',
        shadowColor: '#ddd',
        shadowRadius: 5
    },
    signUpText: {
        color: '#000'
    }
})
