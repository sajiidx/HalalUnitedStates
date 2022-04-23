import React, {Component, useEffect, useState} from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import firebase from 'firebase';
import 'firebase/firestore'

export function CategoryView(props) {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        firebase.firestore()
        .collection("Category")
        .get()
        .then((snap) => {
            const cate = snap.docs.map((doc) => {
                return {
                    key: doc.id,
                    ...doc.data()
                }
            })
            setCategories(cate)
        }).catch((error) => console.log(error))
    }, [])
    return (
        <View style={styles.container}>
            <FlatList
                data={categories}
                renderItem={({item}) => (
                    <TouchableOpacity style={styles.itemContainer} onPress={() => props.navigation.navigate("CategoryProducts", {category: item})}>
                        <Text style={styles.item}>{item.name.toUpperCase()}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22,
   paddingLeft: 10,
  },
  itemContainer: {
    marginVertical: 10,
  },
  item: {
    padding: 10,
    color: '#777777',
    fontSize: 12
  },
});

export default CategoryView
