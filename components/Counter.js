import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import { 
    setCost,
    updateCartGUIQont
} from '../redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export function Counter({id, initial, min, max, setCost, cost, price, updateCartGUIQont}) {
    const [value, setValue] = useState(initial);
    useEffect(()=> {
        updateCartGUIQont(id, value)
    }, [value])
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.buttonCounter} onPress={() => {
            (value > min)? setValue(value - 1) : setValue(value);
            (value > min)? setCost(cost - parseFloat(price)) : setValue(value);
        }}>
            {(value == min)? (
                <Text style={styles.eButtonMinus}>-</Text>
            ):(
                <Text style={styles.buttonMinus}>-</Text>
            )}
            
        </TouchableOpacity>
        
        <View style={styles.valueContainer}>
            <Text style={styles.value}>{value}</Text>
        </View>
        
        <TouchableOpacity style={styles.buttonCounter} onPress={() => {
            (value < max)? setValue(value+1) : setValue(value);
            (value < max)? setCost(cost + parseFloat(price)) : setValue(value);
        }}>
            {(value == max)? (
                <Text style={styles.eButtonPlus}>+</Text>
            ):(
                <Text style={styles.buttonPlus}>+</Text>
            )}
            
        </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
    },
    valueContainer: {
        backgroundColor: '#E8E8E8',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5,
    },
    value: {
        fontWeight: '200',
        fontSize: 14,
        color: '#282828',
    },
    buttonCounter: {
        padding: 5,
    },
    buttonPlus: {
        color: '#777',
        fontWeight: 'bold',
        fontSize: 20,
    },
    buttonMinus: {
        color: '#777',
        fontWeight: 'bold',
        fontSize: 20,
        paddingHorizontal: 2,
    },
    eButtonPlus: {
        color: '#D2042D',
        fontWeight: 'bold',
        fontSize: 20,
    },
    eButtonMinus: {
        color: '#D2042D',
        fontWeight: 'bold',
        fontSize: 20,
        paddingHorizontal: 2,
    }
})

const mapStateToProps = (store) => ({
    cost: store.userState.cost
})

const mapDispatchProps = (dispatch) => bindActionCreators({
    setCost,
    updateCartGUIQont
}, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Counter);
