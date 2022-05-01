import * as actions from '../constants/index';
import firebase from 'firebase';
import { recordActivity } from '../../functions/recordActivity';
require('firebase/firestore');


export function clearData() {
    return ((dispatch) => {
        dispatch({type: actions.CLEAR_DATA});
    })
}

export function fetchStoreProducts(storeID){
    return ((dispatch, getState) => {
        firebase.firestore()
        .collection("Products")
        .where("store", "==", storeID)
        .orderBy("creation", "desc")
        .onSnapshot((snapshot) => {
            let currentStoreProducts = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return { id, ...data }
            })
            dispatch({type: actions.STORE_PRODUCTS_LOADED, currentStoreProducts})
        },(error) => dispatch({type: actions.STORE_PRODUCTS_FAILED_TO_LOAD, error}))
    })
}

export function OnStoreProductSelectedForUpdateOperation(product){
    return ((dispatch, getState) => {
        getState().userState.currentStoreProducts.forEach((value, index) => {
            if(value.id == product){
                dispatch({type: actions.STORE_PRODUCT_SELECTED_FOR_UPDATE_OPERATION, StoreProductSelectedForUpdateOperation: value})
            }
        })
    })
}

export function fetchUser() {
    return ((dispatch) => {
        firebase.firestore()
            .collection("Customers")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists) {
                    dispatch({ type: actions.USER_STATE_CHANGE, currentUser: snapshot.data() });
                }
                else {
                    console.log('Customer does not exist');
                }
            })
    })
}

export function updateCartGUIQont(id, qont){
    return ((dispatch, getState) => {
        dispatch({type: actions.ON_QONT_UPDATE, id, qont});
    })
}

export function loadCartGUI(){
    return ((dispatch, getState) => {
        firebase.firestore()
        .collection('Cart')
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((snapshot) => {
            if(snapshot.exists){
                let cart = {
                    id: firebase.auth().currentUser.uid,
                    items: [],
                    ...snapshot.data(),
                }

                firebase.firestore()
                .collection('Cart')
                .doc(firebase.auth().currentUser.uid)
                .collection("Items")
                .get()
                .then((snapshots) => {
                    cart.items = snapshots.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    });
                    let items = [];
                    const promises = [];
                    for(var item in cart.items){
                        promises.push(new Promise((resolve, reject)=>{
                            firebase.firestore()
                            .collection("Products")
                            .doc(cart.items[item].id)
                            .get()
                            .then((snap) => {
                                // console.log(snap.data())
                                items.push({id: snap.id, qont: 1, ...snap.data()});
                                resolve(snap.data());
                            });
                        }));
                    }

                    Promise.all(promises)
                    .then((results) => {
                        // console.log("All done", results, items);
                        cart.items = items;
                        dispatch({type: actions.LOADED_ITEM_IN_CART_GUI, cart});
                        // console.log(getState());
                        loadCost();
                    })
                    .catch((e) => {
                        console.error('Error: One of All Promise is reject.')
                    });
                });
            }
            else{
                console.log("Snapshot doesn't exist.");
            }
        });
    })
}

export function addCartItemToGUI(itm){
    return ((dispatch, getState) => {
        loadCost();
        dispatch({type: actions.ADDED_ITEM_IN_CART_GUI, item: {qont: 1, ...itm}});
        // console.log(getState());
    })
}

export function loadCost(){
    return ((dispatch, getState) => {
        const items = getState().userState.gui.cart.items;
        var result = items.reduce(function (acc, obj) {
            return parseFloat(acc) + parseFloat(obj.price) * parseFloat(obj.qont)
        }, 0);
        dispatch({type: actions.ON_COST_CHANGED, cost: result});
    })
}

export function setCost(cost){
    return ((dispatch, getState) => {
        dispatch({type: actions.ON_COST_CHANGED, cost});
    })
}

export function removeCartItemFromGUI(itemID){
    return ((dispatch, getState) => {
        loadCost();
        dispatch({type: actions.REMOVED_ITEM_FROM_CART_GUI, itemID});
    })
}

export function fetchCartItems(){
    return((dispatch) => {
        firebase.firestore()
        .collection('Cart')
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((snapshot) => {
            if(snapshot.exists){
                let cart = {
                    id: firebase.auth().currentUser.uid,
                    items: [],
                    ...snapshot.data(),
                }

                firebase.firestore()
                .collection('Cart')
                .doc(firebase.auth().currentUser.uid)
                .collection("Items")
                .get()
                .then((snapshots) => {
                    cart.items = snapshots.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    });
                    dispatch({type: actions.LOADED_ITEM_IN_CART , cart: cart});
                });
            }
            else{
                console.log("Snapshot doesn't exist.");
            }
        });
    });
}

export function addItemToCart(item){
    return ((dispatch, getState) => {
        firebase.firestore()
        .collection('Cart')
        .doc(firebase.auth().currentUser.uid)
        .collection('Items')
        .doc(item.id)
        .set({
            price: item.price,
            stock: item.quantity,
            quantity: 1
        })
        .then((result)=>{

            firebase.firestore()
            .collection("Logs")
            .add({
                time: firebase.firestore.FieldValue.serverTimestamp(),
                user: firebase.auth().currentUser.uid,
                userRole: "Customer",
                object: item.id,
                objectType: "Product",
                on: "Cart",
                action: "Added",
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
                    object: item.id,
                    objectType: "Product",
                    action: "Item added to cart",
                    actionType: "Write"
                }).then((snap) => {
                    recordActivity()
                    dispatch({type: actions.ADDED_ITEM_IN_CART, item: {qont: 1, ...item}});
                }).catch((error) => console.error(error))
            }).catch((error) => console.error(error))

        })
        .catch((error)=>{
            console.error(error);
        })
    });
}

export function removeItemFromCart(itemID){
    return ((dispatch, getState) => {
        firebase.firestore()
        .collection('Cart')
        .doc(firebase.auth().currentUser.uid)
        .collection('Items')
        .doc(itemID)
        .delete()
        .then((result)=>{

            firebase.firestore()
            .collection("Logs")
            .add({
                time: firebase.firestore.FieldValue.serverTimestamp(),
                user: firebase.auth().currentUser.uid,
                userRole: "Customer",
                object: itemID,
                objectType: "Product",
                on: "Cart",
                action: "Removed",
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
                    object: itemID,
                    objectType: "Product",
                    action: "Item removed from cart",
                    actionType: "Write"
                }).then((snap) => {
                    recordActivity()
                    dispatch({type: actions.REMOVED_ITEM_FROM_CART, itemID});
                }).catch((error) => console.error(error))

            }).catch((error) => console.error(error))

            
        })
        .catch((error)=>{
            console.error(error);
        })
    });
}

export function loadWishlistGUI(){
    return ((dispatch, getState) => {
        firebase.firestore()
        .collection('Wishlists')
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((snapshot) => {
            if(snapshot.exists){
                let wishlist = {
                    id: firebase.auth().currentUser.uid,
                    items: [],
                    ...snapshot.data(),
                }

                firebase.firestore()
                .collection('Wishlists')
                .doc(firebase.auth().currentUser.uid)
                .collection("Items")
                .get()
                .then((snapshots) => {
                    wishlist.items = snapshots.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    });
                    let items = [];
                    const promises = [];
                    for(var item in wishlist.items){
                        promises.push(new Promise((resolve, reject)=>{
                            firebase.firestore()
                            .collection("Products")
                            .doc(wishlist.items[item].id)
                            .get()
                            .then((snap) => {
                                // console.log(snap.data())
                                items.push({id: snap.id, ...snap.data()});
                                resolve(snap.data());
                            });
                        }));
                    }

                    Promise.all(promises)
                    .then((results) => {
                        // console.log("All done", results, items);
                        wishlist.items = items;
                        dispatch({type: actions.LOADED_ITEM_IN_WISHLIST_GUI, wishlist});
                        // console.log(getState());
                    })
                    .catch((e) => {
                        console.error('Error: One of All Promise is reject.')
                    });
                });
            }
            else{
                console.log("Snapshot doesn't exist.");
            }
        });
    })
}

export function addWishlistItemToGUI(item){
    return ((dispatch, getState) => {
        dispatch({type: actions.ADDED_ITEM_IN_WISHLIST_GUI, item});
        // console.log(getState());
    })
}

export function removeWishlistItemFromGUI(itemID){
    return ((dispatch, getState) => {
        dispatch({type: actions.REMOVED_ITEM_FROM_WISHLIST_GUI, itemID});
        // console.log(getState());
    })
}

export function fetchWishlistItems(){
    return((dispatch) => {
        firebase.firestore()
        .collection('Wishlists')
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((snapshot) => {
            if(snapshot.exists){
                let wishlist = {
                    id: firebase.auth().currentUser.uid,
                    items: [],
                    ...snapshot.data(),
                }

                firebase.firestore()
                .collection('Wishlists')
                .doc(firebase.auth().currentUser.uid)
                .collection("Items")
                .get()
                .then((snapshots) => {
                    wishlist.items = snapshots.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    });
                    dispatch({type: actions.LOADED_ITEM_IN_WISHLIST , wishlist: wishlist});
                });
            }
            else{
                console.log("Snapshot doesn't exist.");
            }
        });
    });
}

export function addItemToWishlist(item){
    return ((dispatch, getState) => {
        firebase.firestore()
        .collection('Wishlists')
        .doc(firebase.auth().currentUser.uid)
        .collection('Items')
        .doc(item.id)
        .set({
            price: item.price,
            stock: item.quantity,
            quantity: 1
        })
        .then((result)=>{

            firebase.firestore()
            .collection("Logs")
            .add({
                time: firebase.firestore.FieldValue.serverTimestamp(),
                user: firebase.auth().currentUser.uid,
                userRole: "Customer",
                object: item.id,
                objectType: "Product",
                on: "Wishlist",
                action: "Added",
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
                    object: item.id,
                    objectType: "Product",
                    action: "Item added to wishlist",
                    actionType: "Write"
                }).then((snap) => {
                    recordActivity()
                    dispatch({type: actions.ADDED_ITEM_IN_WISHLIST, item: item});
                }).catch((error) => console.error(error))
            }).catch((error) => console.error(error))
        })
        .catch((error)=>{
            console.error(error);
        })
    });
}

export function removeItemFromWishlist(itemID){
    return ((dispatch, getState) => {
        firebase.firestore()
        .collection('Wishlists')
        .doc(firebase.auth().currentUser.uid)
        .collection('Items')
        .doc(itemID)
        .delete()
        .then((result)=>{

            firebase.firestore()
            .collection("Logs")
            .add({
                time: firebase.firestore.FieldValue.serverTimestamp(),
                user: firebase.auth().currentUser.uid,
                userRole: "Customer",
                object: itemID,
                objectType: "Product",
                on: "Wishlist",
                action: "Removed",
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
                    object: itemID,
                    objectType: "Product",
                    action: "Item removed from wishlist",
                    actionType: "Write"
                }).then((snap) => {
                    recordActivity()
                    dispatch({type: actions.REMOVED_ITEM_FROM_WISHLIST, itemID});
                }).catch((error) => console.error(error))
            }).catch((error) => console.error(error))            
        })
        .catch((error)=>{
            console.error(error);
        })
    });
}

export function fetchProfile(){
    return ((dispatch, getState) => {
        firebase.firestore()
        .collection("Stores")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((snapshot) => {
            dispatch({type: actions.ON_PROFILE_LOAD, profile: {id: snapshot.id, ...snapshot.data()}})
        }).catch((error) => console.error(error))
    })
}

export function fetchOrders(){
    return ((dispatch, getState) => {
        firebase.firestore()
        .collection("orderSeparator")
        .doc(firebase.auth().currentUser.uid)
        .collection("orders")
        .get()
        .then((snapshot) => {
            let orders = snapshot.docs.map((doc) => {
                return doc.data()
            })
            let items = []
            const promises = [];
            for(var order in orders){
                promises.push(new Promise((resolve, reject)=>{
                    firebase.firestore()
                    .collection("Orders")
                    .doc(orders[order].id)
                    .get()
                    .then((snap) => {
                        items.push({id: snap.id, ...snap.data()});
                        resolve(snap);
                    }).catch((error) => {
                        console.error(error);
                        reject(error)
                    })
                }));
            }

            Promise.all(promises)
            .then((results) => {
                console.log("INDEX", items)
                dispatch({type: actions.ON_ORDERS_LOAD, orders: items})
            })
            .catch((err) => {
                console.error(err.message)
            });
        }).catch((error) => console.error(error))
    })
}