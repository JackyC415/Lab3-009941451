import React, { Component } from 'react';
import axios from 'axios';
import OrderItem from './OrderItem';

class AddToCart extends Component {
  constructor(props) {
    super(props);
    this.state = { items: '' };
  }

  componentDidMount() {
    axios.get('/viewSearchItems')
      .then(res => {
        this.setState({ items: res.data });
      }).catch((err) => {
        console.log(err);
      });
  }

  tabRow() {
    if (this.state.items instanceof Array) {
      return this.state.items.map(function (object, i) {
        return <OrderItem obj={object} key={i} />;
      })
    }
  }

  render() {
    return (
      <div className="container">
        <h3>Add to Cart</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <td>Name</td>
              <td>Description</td>
              <td>Image</td>
              <td>Quantity</td>
              <td>Price</td>
              <td>Restaurant</td>
            </tr>
          </thead>
          <tbody> {this.tabRow()} </tbody>
        </table>
      </div>
    );
  }
}

export default AddToCart;
