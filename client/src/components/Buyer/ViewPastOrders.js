import React, { Component } from 'react';
import axios from 'axios';
import ViewOrderStatus from './ViewOrderStatus';

class ViewPastOrders extends Component {
    constructor(props) {
        super(props);
        this.state = { items: [] };
    }

    componentDidMount() {
        axios.get('/viewPastOrders')
            .then(res => {
                this.setState({ items: res.data });
            }).catch((err) => {
                console.log(err);
            });
    }

    tabRow() {
        if (this.state.items instanceof Array) {
            return this.state.items.map(function (object, i) {
                return <ViewOrderStatus obj={object} key={i} />;
            })
        }
    }

    render() {
        return (
            <div className="container">
                <h3>View Past Orders</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Quantity</td>
                            <td>Price</td>
                            <td>Status</td>
                            <td>Buyer</td>
                            <td>Date</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody> {this.tabRow()} </tbody>
                </table>
            </div>
        );
    }
}

export default ViewPastOrders;
