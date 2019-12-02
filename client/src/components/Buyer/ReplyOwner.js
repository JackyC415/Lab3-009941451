import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

class ReplyOwner extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td>{this.props.obj.owner}</td>
        <td>{this.props.obj.message}</td>
        <td>{this.props.obj.date}</td>
        <td><Link to={"/messageOwner/" + this.props.obj.owner} className="btn btn-primary">Reply</Link></td>
      </tr>
    );
  }
}

export default withRouter(ReplyOwner);