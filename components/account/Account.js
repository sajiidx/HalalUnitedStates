import React, { Component } from 'react';
import {View, Text, Button} from 'react-native';
import firebase from 'firebase';

export class Account extends Component {
    render() {
        return (
             <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Account</Text>
                <Button title='logout' onPress={() => firebase.auth().signOut().then(() => {
                    alert("User is signed out!")
                }).catch((err) => {
                    alert(err.message)
                })} />
            </View>
        )
    }
}

export default Account;
