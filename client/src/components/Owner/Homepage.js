import React, { Component } from 'react';
import ItemList from './ItemList';
import AddItem from './AddItem';

class OwnerHome extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1>Owner's ItemList</h1>
                <ItemList />
                <AddItem />
            </div>
        )
    }
}

export default OwnerHome;