import firebase from "firebase"

export function recordActivity(){
    var now = new Date()
    var date = now.getFullYear().toString() + "-" + now.getMonth().toString() + "-" + now.getDate().toString()
    firebase.database()
    .ref("logs")
    .child(firebase.auth().currentUser.uid)
    .child("activity")
    .child(date)
    .set(firebase.database.ServerValue.increment(1))
    .then((value) => console.log("Success"))
}