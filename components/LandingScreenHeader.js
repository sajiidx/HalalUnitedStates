import React from 'react'
import { View, Text, StyleSheet, Button, Image, Platform} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function LandingScreenHeader({navigation}) {
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


const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
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
