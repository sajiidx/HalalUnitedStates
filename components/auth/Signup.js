import React, {Component} from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import firebase from 'firebase';
import "firebase/firestore";

export class Signin extends Component{
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            first_name: '',
            last_name: ''
        }

        this.onSignUp = this.onSignUp.bind(this);
    }

    onSignUp(){
        const { email, password, first_name, last_name }  = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            firebase.firestore().collection("Customers")
            .doc(firebase.auth().currentUser.uid)
            .set({
                first_name,
                last_name,
                email,
                creation: firebase.firestore.FieldValue.serverTimestamp(),
            })
            firebase.firestore().collection("Cart")
            .doc(firebase.auth().currentUser.uid)
            .set({
                exists: true
            })
            firebase.firestore().collection("Wishlists")
            .doc(firebase.auth().currentUser.uid)
            .set({
                exists: true
            })
            firebase.firestore().collection("Stores")
            .doc(firebase.auth().currentUser.uid)
            .set({
                opened: false,
                creation: firebase.firestore.FieldValue.serverTimestamp(),
                ratings: 0,
                urls: [""],
                country: "",
                about: "",
                address: "",
                owner: first_name + " " + last_name,
                shoptype: "",
                state: "",
                subtitle: "",
                title: first_name + "'s Shop"
            })
            firebase.firestore().collection("orderSeparator")
            .doc(firebase.auth().currentUser.uid)
            .set({
                exists: true
            })
            
            //console.log(result);
        })
        .catch((error) => {
            console.log("Error: " + error);
        });
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.credentialsContainer}>
                    <View style={styles.headerTextContainer}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={styles.headerText}>CREATE AN ACCOUNT</Text>
                        </View>
                    </View>
                    <View style={styles.inputBoxRow}>
                        <View style={styles.cellInputBox}>
                            <Text style={styles.label}>First Name</Text>
                            <TextInput onChangeText={(first_name) => this.setState({first_name})} style={styles.textInput}/>
                        </View>
                        <View style={styles.cellInputBox}>
                                <Text style={styles.label}>Surname</Text>
                                <TextInput onChangeText={(last_name) => this.setState({last_name})} style={styles.textInput}/>
                        </View>
                    </View>
                    <View style={styles.inputBox}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput onChangeText={(email) => this.setState({email})} style={styles.textInput}/>
                    </View>
                    <View style={styles.inputBox}>
                            <Text style={styles.label}>Password</Text>
                            <TextInput style={styles.textInput} onChangeText={(password) => this.setState({password})}  secureTextEntry={true}/>
                    </View>
                    <View style={styles.buttonBox}>
                        <Button onPress={()=> this.onSignUp()} color={"black"} title='Sign Up'></Button>
                    </View>
                    <View style={styles.signupButtonContainer}>
                        <Text style={styles.needAnAccountText}>Already have an account?</Text>
                        <TouchableOpacity style={styles.signupTextContainer} onPress={() => this.props.navigation.goBack()}>
                            <Text style={styles.signupText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
    },
    credentialsContainer: {
        flex: 1/3,
        padding: 20,
        justifyContent: 'center',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        shadowRadius: 5,
        shadowColor: '#ddd'
    },
    headerTextContainer: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 20,
    },
    inputBoxRow: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputBox: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 10,
    },
    label: {
      fontWeight: '100',
      marginBottom: 2,
    },
    cellTextInput: {
      padding: 10,
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 5,
    },
    textInput: {
        width: '100%',
        padding: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
    },
    checkboxContainer: {
      flexDirection: "row",
      marginBottom: 20,
    },
    checkbox: {
      alignSelf: "center",
    },
    checkboxLabel: {
        margin: 8,
    },
    buttonBox: {
      padding: 10,
    },
    signupButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    needAnAccountText: {
        color: '#999',
        fontSize: 11,
    },
    signupTextContainer: {
        marginLeft: 5,
    },
    signupText: {
        color: 'green',
        fontSize: 14,
    }
});
  
export default Signin;
