import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

class ReplyMessage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td>{this.props.obj.buyer}</td>
        <td>{this.props.obj.message}</td>
        <td>{this.props.obj.date}</td>
        <td><Link to={"/replyMessage/"+this.props.obj.buyer} className="btn btn-primary">Reply</Link></td>
      </tr>
    );
  }
}

export default withRouter(ReplyMessage);