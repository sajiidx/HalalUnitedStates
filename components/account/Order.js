import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import OrderListHeader from './OrderListHeader';
import OrderListItem from './OrderListItem';

export function Order({navigation, orders}) {
    return (
        <View style={{flex: 1}}>
            <FlatList
                data={orders}
                keyExtractor={(item, index) => item.id}
                renderItem={({item}) => <OrderListItem navigation={navigation} item={item} />}
                ListHeaderComponent={OrderListHeader}
            />
        </View>
    )
}

const mapStateToProps = (store) => ({
    orders: store.userState.orders
})

export default connect(mapStateToProps, null)(Order);