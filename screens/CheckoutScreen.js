import React, {Component} from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import firebase from 'firebase';
import "firebase/firestore";

export class CheckoutScreen extends Component{
    constructor(props){
        super(props);

        this.state = {
            items: this.props.route.params.items,
            cost: this.props.route.params.cost,
            houseno: '',
            street: '',
            zip: '',
            city: '',
            state: '',
            country: '',
        }
        this.onOrderPlace = this.onOrderPlace.bind(this);
    }

    onOrderPlace(){
        const { items, cost, houseno, street, zip, city, state, country}  = this.state;
        firebase.firestore()
        .collection('Orders')
        .add({
            items,
            cost,
            creator: firebase.auth().currentUser.uid,
            address: { houseno, street, zip, city, state, country},
            creation: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then((order) => {
            const promises = [];
            for(var i in items){
                promises.push(new Promise((resolve, reject)=>{
                    console.log(items[i])
                    console.log(order)
                    firebase.firestore()
                    .collection("orderSeparator")
                    .doc(items[i].store.trim())
                    .collection("orders")
                    .doc(order.id.trim())
                    .set({
                        store: items[i].store,
                        id: order.id,
                        status: 'pending'
                    })
                    .then((snap) => {
                        console.log("Done.")
                        resolve(items[i])
                    }).catch((error) => {
                        reject(error);
                    })
                }));
            }

            Promise.all(promises)
            .then((results) => {
                alert("Order Placed Successfully");
                this.props.navigation.popToTop();
            })
            .catch((err) => {
                alert(err.message)
            });
        }).catch((err) => alert(err.message))
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.credentialsContainer}>
                    <View style={styles.headerTextContainer}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={styles.headerText}>Order Placement</Text>
                        </View>
                    </View>
                    <View style={styles.inputBoxRow}>
                        <View style={styles.cellInputBox}>
                            <Text style={styles.label}>House No.</Text>
                            <TextInput onChangeText={(houseno) => this.setState({houseno})} style={styles.textInput}/>
                        </View>
                        <View style={styles.cellInputBox}>
                                <Text style={styles.label}>Street</Text>
                                <TextInput onChangeText={(street) => this.setState({street})} style={styles.textInput}/>
                        </View>
                    </View>
                    <View style={styles.inputBoxRow}>
                        <View style={styles.cellInputBox}>
                            <Text style={styles.label}>Zip Code</Text>
                            <TextInput onChangeText={(zip) => this.setState({zip})} style={styles.textInput}/>
                        </View>
                        <View style={styles.cellInputBox}>
                                <Text style={styles.label}>City</Text>
                                <TextInput onChangeText={(city) => this.setState({city})} style={styles.textInput}/>
                        </View>
                    </View>
                    <View style={styles.inputBox}>
                            <Text style={styles.label}>State</Text>
                            <TextInput style={styles.textInput} onChangeText={(state) => this.setState({state})}/>
                    </View>
                    <View style={styles.inputBox}>
                            <Text style={styles.label}>Country</Text>
                            <TextInput onChangeText={(country) => this.setState({country})} style={styles.textInput}/>
                    </View>
                    <View style={styles.buttonBox}>
                        <Button onPress={()=> this.onOrderPlace()} color={"black"} title='Place Order'></Button>
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
  
export default CheckoutScreen;
