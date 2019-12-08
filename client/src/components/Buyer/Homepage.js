import React, { Component } from 'react';
import ItemList from '../Owner/ItemList';

class BuyerHome extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1>Buyer's ItemList</h1>
                <ItemList />
            </div>
        )
    }
}

export default BuyerHome;