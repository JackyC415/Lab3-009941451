import React, { Component } from 'react';
import axios from 'axios';
import ManipulateItem from './ManipulateItem';

class ViewCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: ''
    };
  }

  componentDidMount() {
    axios.get('/viewCart')
      .then(res => {
        this.setState({ orders: res.data });
      }).catch((err) => {
        console.log(err);
      });
  }

  tabRow() {
    if (this.state.orders instanceof Array) {
      return this.state.orders.map(function (object, i) {
        return <ManipulateItem obj={object} key={i} />;
      })
    }
  }

  render() {
    return (
      <div className="container">
        <h3>Cart</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <td>Name</td>
              <td>Quantity</td>
              <td>Price</td>
              <td>Owner</td>
              <td>Order Date</td>
            </tr>
          </thead>
          <tbody> {this.tabRow()} </tbody>
        </table>
      </div>
    );
  }
}

export default ViewCart;
