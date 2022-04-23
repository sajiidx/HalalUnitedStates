import React from 'react';
import { useState } from 'react';
import { Button, StyleSheet, Text, View, CheckBox, Image, Platform} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase';

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
