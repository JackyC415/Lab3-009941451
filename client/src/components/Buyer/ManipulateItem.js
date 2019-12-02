import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

class ManipulateItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td>{this.props.obj.order_name}</td>
        <td>{this.props.obj.order_quantity}</td>
        <td>{this.props.obj.order_price}</td>
        <td>{this.props.obj.owner}</td>
        <td>{this.props.obj.date}</td>
        <td><Link to={"/messageOwner/" + this.props.obj.owner} className="btn btn-primary">Message Owner</Link></td>
      </tr>
    );
  }
}

export default withRouter(ManipulateItem);