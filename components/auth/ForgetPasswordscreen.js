import React from 'react';
import { useState } from 'react';
import { Button, StyleSheet, Text, View, Image, Platform} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase';
import { Dimensions } from "react-native";

export default function ForgetPasswordscreen(props) {
    const [email, setEmail] = useState('');

    const validateLoginCredentials = (email) => {
        if(!email.trim()){
            alert("Email is Required");
            return;
        }
        firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            alert("Password Reset Mail is Sent")
        })
        .catch((error) => {
            console.log(error)
            alert(error.message)
        })
    }
    if(Dimensions.get("window").width <= 580){
      return (
        <View style={mstyles.container}>
          <View style={mstyles.credentialsContainer}>
              <View style={mstyles.headerTextContainer}>
                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={mstyles.headerText}>RECOVER PASSWORD</Text>
                  </View>
              </View>
              <View style={mstyles.inputBox}>
                    <Text style={mstyles.label}>Email</Text>
                    <TextInput onChangeText={(value) => setEmail(value)} style={mstyles.textInput}/>
              </View>
              <View style={mstyles.buttonBox}>
                  <Button onPress={() => validateLoginCredentials(email)} color={"black"} title='Reset Password'/>
              </View>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.credentialsContainer}>
            <View style={styles.headerTextContainer}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={styles.headerText}>RECOVER PASSWORD</Text>
                </View>
            </View>
            <View style={styles.inputBox}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput onChangeText={(value) => setEmail(value)} style={styles.textInput}/>
            </View>
            <View style={styles.buttonBox}>
                <Button onPress={() => validateLoginCredentials(email)} color={"black"} title='Reset Password'/>
            </View>
        </View>
      </View>
    );
}

const mstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  credentialsContainer: {
  },
  headerTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  backIconContainer: {
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  inputBox: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginVertical: 10,
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
  buttonBox: {
    marginVertical: 10,
  }
});


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
