import React, {Component} from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, CheckBox } from 'react-native';

import firebase from 'firebase';

export class Signin extends Component{
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            isSelected: false
        }

        this.onSignIn = this.onSignIn.bind(this);
    }

    onSignIn(){
        const { email, password }  = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            alert(error.message);
        });
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.credentialsContainer}>
                    <Text style={{fontSize: 30, fontWeight: 'bold'}}>Get started selling on Emporium</Text>
                    <View style={styles.inputBox}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput onChangeText={(email) => this.setState({email})} style={styles.textInput}/>
                    </View>
                    <View style={styles.inputBox}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput style={styles.textInput} onChangeText={(password) => this.setState({password})} secureTextEntry={true}/>
                        <View style={styles.checkboxContainer}>
                            <CheckBox value={this.state.isSelected} onValueChange={(isSelected) =>this.setState({isSelected})} style={styles.checkbox} />
                            <Text style={styles.checkboxLabel}>Remember me?</Text>
                        </View>
                    </View>
                    <View style={styles.buttonBox}>
                        <Button onPress={()=> this.onSignIn()} color={"black"} title='Login'/>
                    </View>
                    {/* <View style={styles.buttonBox}>
                        <Button onPress={() => googleSignIn()} color={"black"} title='Sign in with Google'/>
                    </View> */}
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("ForgetPassword")}>
                                <Text style={styles.signupText}>Forget Password?</Text>
                            </TouchableOpacity>
                        </View>
                    <View style={styles.signupButtonContainer}>
                        <Text style={styles.needAnAccountText}>Need an account?</Text>
                        <TouchableOpacity style={styles.signupTextContainer} onPress={() => this.props.navigation.navigate("Signup")}>
                            <Text style={styles.signupText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
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
        flex: 1/4,
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
    backIconContainer: {
        padding: 0
    },
    headerText: {
        fontSize: 20,
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