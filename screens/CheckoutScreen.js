import React, {Component} from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

import firebase from 'firebase';
import "firebase/firestore";
import { recordActivity } from '../functions/recordActivity';

function IsStateValid(state){
    var valid = true;
    Object.values(state).forEach((value, index) => {
        if(!value.toString().trim()){
            valid = false
        }
    })
    return valid;
}

let months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

const screenWidth = Dimensions.get("window").width;

export class CheckoutScreen extends Component{
    constructor(props){
        super(props);

        this.date = new Date()

        this.state = {
            items: this.props.route.params.items,
            cost: this.props.route.params.cost,
            houseno: '',
            street: '',
            zip: '',
            city: '',
            state: '',
            country: '',
            phone: '',
        }
        this.onOrderPlace = this.onOrderPlace.bind(this);
    }

    onOrderPlace(){
        if(!IsStateValid(this.state)){
            alert("All Fields Are Required!")
            return;
        }
        const { items, cost, houseno, street, zip, city, state, country, phone}  = this.state;
        firebase.firestore()
        .collection('Orders')
        .add({
            items,
            cost,
            creator: firebase.auth().currentUser.uid,
            phone,
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
                        firebase.database()
                        .ref("store")
                        .child(items[i].store)
                        .child("sold")
                        .child([new Date().getFullYear().toString()+":"+new Date().getMonth().toString()])
                        .set(firebase.database.ServerValue.increment(1))

                        firebase.database()
                        .ref("products")
                        .child(items[i].id)
                        .child("quantity")
                        .set(firebase.database.ServerValue.increment(-items[i].qont))
                        .then((result) => {
                            console.log("Done.")
                            resolve(items[i])
                        })
                    }).catch((error) => {
                        reject(error);
                    })
                }));
            }

            Promise.all(promises)
            .then((results) => {
                firebase.firestore()
                .collection("Logs")
                .add({
                    time: firebase.firestore.FieldValue.serverTimestamp(),
                    user: firebase.auth().currentUser.uid,
                    userRole: "Customer",
                    object: order.id.trim(),
                    objectType: "Order",
                    on: "",
                    action: "Placed",
                    actionType: "Write"
                }).then((snap)=> {
                    firebase.firestore()
                    .collection("Activity")
                    .doc(firebase.auth().currentUser.uid)
                    .collection("Logs")
                    .add({
                        time: firebase.firestore.FieldValue.serverTimestamp(),
                        subject: firebase.auth().currentUser.uid,
                        subjectType: "Customer",
                        object: order.id.trim(),
                        objectType: "Order",
                        action: "Placed Order",
                        actionType: "Write"
                    }).then((snap) => {
                        recordActivity()
                        alert("Order Placed Successfully");
                        this.props.navigation.popToTop();
                    }).catch((error) => console.error(error))
                }).catch((error) => console.error(error))
                    
            })
            .catch((err) => {
                alert(err.message)
            });
        }).catch((err) => alert(err.message))
    }

    render(){
        if(screenWidth <= 580){
            return (
                <View style={mstyles.container}>
                    <View style={mstyles.credentialsContainer}>
                        <View style={mstyles.headerTextContainer}>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={mstyles.headerText}>Order Placement</Text>
                            </View>
                        </View>
                        <View style={mstyles.inputBoxRow}>
                            <View style={mstyles.cellInputBox}>
                                <Text style={mstyles.label}>House No.</Text>
                                <TextInput onChangeText={(houseno) => this.setState({houseno})} style={mstyles.textInput}/>
                            </View>
                            <View style={mstyles.cellInputBox}>
                                    <Text style={mstyles.label}>Street</Text>
                                    <TextInput onChangeText={(street) => this.setState({street})} style={mstyles.textInput}/>
                            </View>
                        </View>
                        <View style={mstyles.inputBoxRow}>
                            <View style={mstyles.cellInputBox}>
                                <Text style={mstyles.label}>Zip Code</Text>
                                <TextInput onChangeText={(zip) => this.setState({zip})} style={mstyles.textInput}/>
                            </View>
                            <View style={mstyles.cellInputBox}>
                                    <Text style={mstyles.label}>City</Text>
                                    <TextInput onChangeText={(city) => this.setState({city})} style={mstyles.textInput}/>
                            </View>
                        </View>
                        <View style={mstyles.inputBoxRow}>
                            <View style={mstyles.cellInputBox}>
                                <Text style={mstyles.label}>State</Text>
                                <TextInput style={mstyles.textInput} onChangeText={(state) => this.setState({state})}/>
                            </View>
                            <View style={mstyles.cellInputBox}>
                                <Text style={mstyles.label}>Country</Text>
                                <TextInput style={mstyles.textInput} onChangeText={(country) => this.setState({country})}/>
                            </View>
                        </View>
                        <View style={mstyles.inputBox}>
                            <Text style={mstyles.label}>Phone No.</Text>
                            <TextInput onChangeText={(phone) => this.setState({phone})} style={mstyles.textInput}/>
                        </View>
                        <View style={mstyles.buttonBox}>
                            <Button onPress={()=> this.onOrderPlace()} color={"black"} title='Place Order'></Button>
                        </View>
                    </View>
                </View>
            );
        }
        return (
            <View style={styles.container}>
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
                <View style={styles.inputBoxRow}>
                    <View style={styles.cellInputBox}>
                        <Text style={styles.label}>State</Text>
                        <TextInput style={styles.textInput} onChangeText={(state) => this.setState({state})}/>
                    </View>
                    <View style={styles.cellInputBox}>
                        <Text style={styles.label}>Country</Text>
                        <TextInput style={styles.textInput} onChangeText={(country) => this.setState({country})}/>
                    </View>
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.label}>Phone No.</Text>
                    <TextInput onChangeText={(phone) => this.setState({phone})} style={styles.textInput}/>
                </View>
                <View style={styles.buttonBox}>
                    <Button onPress={()=> this.onOrderPlace()} color={"black"} title='Place Order'></Button>
                </View>
            </View>
        );
    }
}


const mstyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      display: 'flex',
      padding: 20,
    },
    headerTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 10,
    },
    headerText: {
        fontSize: 20,
    },
    inputBoxRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
    },
    inputBox: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginVertical: 5,
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
        marginVertical: 10,
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
