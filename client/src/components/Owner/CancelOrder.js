import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';

class CancelOrder extends Component {
  constructor(props) {
    super(props);
  }

  cancelOrder = () => {
    axios.delete('/cancelOrder/' + this.props.obj._id)
      .then(res => {
        if (res.status === 200) {
          alert("Cancelled order!");
          this.props.history.push('/ownerhome/menu');
        }
      }).catch((err) => {
        console.log(err);
      })
  }

  deliverOrder = () => {
    axios.delete('/deliverOrder/' + this.props.obj._id)
      .then(res => {
        if (res.status === 200) {
          alert("Delivered order!");
          this.props.history.push('/ownerhome/menu');
        }
      }).catch((err) => {
        console.log(err);
      })
  }
  

  render() {
    return (
      <tr>
        <td>{this.props.obj.order_name}</td>
        <td>{this.props.obj.order_quantity}</td>
        <td>{this.props.obj.order_price}</td>
        <td>{this.props.obj.buyer}</td>
        <td>{this.props.obj.date}</td>
        <td>
          <form >
            <button type="button" onClick={this.cancelOrder} className="btn btn-danger">Cancel</button>
          </form>
        </td>
        <td>
          <form >
            <button type="button" onClick={this.deliverOrder} className="btn btn-danger">Delivered</button>
          </form>
        </td>
      </tr>
    );
  }
}

export default withRouter(CancelOrder);
