import React, { Component } from 'react';
import axios from 'axios';
import ReplyMessage from './ReplyMessage';

class Inbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: ''
    };
  }

  componentDidMount() {
    axios.get('/viewMessages')
      .then(res => {
        this.setState({ messages: res.data });
      }).catch((err) => {
        console.log(err);
      });
  }

  tabRow() {
    if (this.state.messages instanceof Array) {
      return this.state.messages.map(function (object, i) {
        return <ReplyMessage obj={object} key={i} />;
      })
    }
  }

  render() {
    return (
      <div className="container">
        <h3>Inbox</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <td>Buyer</td>
              <td>Message</td>
              <td>Date</td>
            </tr>
          </thead>
          <tbody> {this.tabRow()} </tbody>
        </table>
      </div>
    );
  }
}

export default Inbox;
