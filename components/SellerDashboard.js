import React, { Component } from 'react';
import Header from './seller/Header';

export default class SellerDashboard extends Component {
    render() {
        return (
            <Header navigation={this.props.navigation} />
        );
    }
}
