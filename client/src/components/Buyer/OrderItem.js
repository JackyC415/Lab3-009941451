import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';

class OrderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item_quantity: 0
    }
  }

  orderItem = () => {
    axios.post('/orderItem/' + this.props.obj._id, { quantity: this.state.item_quantity })
      .then(res => {
        (res.status === 200) ? alert("Added item to Cart!") : alert("Out of stock!");
      }).catch((err) => {
        console.log(err);
      })
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <tr>
        <td>{this.props.obj.item_name}</td>
        <td>{this.props.obj.item_desc}</td>
        <td><img src="/images/pizza.jpg" alt=""/></td>
        <td>
          <input
            name="item_quantity"
            type="number"
            className="form-control"
            onChange={this.handleChange}
            value={this.state.item_quantity}>
          </input>
        </td>
        <td>{this.props.obj.item_price}</td>
        <td>{this.props.obj.restaurant_name}</td>
        <td>
          <form>
            <button type="button" onClick={this.orderItem} className="btn btn-primary">Order</button>
          </form>
        </td>
      </tr>
    );
  }
}

export default withRouter(OrderItem);
