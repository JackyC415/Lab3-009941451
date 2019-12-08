import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getItemsQuery } from '../../queries/queries';

class ItemList extends Component {
    displayItems() {
        let data = this.props.data;
        console.log(JSON.stringify(data));
        if (data.loading) {
            return (<div>Loading items...</div>);
        } else {
            return data.items.map(item => {
                return (
                    <li key={item.id}>
                        <strong>[Name]: </strong> {item.name}
                        <strong>[Section]: </strong> {item.section}
                        <strong>[Restaurant]: </strong> {item.restaurantName}
                        <strong>[Owner_ID]: </strong> {item.owner_id}
                    </li>
                );
            })
        }
    }
    render() {
        return (
            <div>
                <ul id="item-list">
                    {this.displayItems()}
                </ul>
            </div>
        );
    }
}

export default graphql(getItemsQuery)(ItemList);