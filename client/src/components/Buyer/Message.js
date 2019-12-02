import React, { Component } from 'react';
import axios from 'axios';

class Message extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  messageOwner = (e) => {
    e.preventDefault();
    let data = {
      owner: this.props.match.params.id,
      message: this.state.message
    }

    axios.post('/messageOwner', data)
      .then(res => {
        alert('Message Sent!');
        console.log(JSON.stringify(res));
      }).catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <h1 className="text-center">Message Owner</h1>
        <div className="row justify-content-md-center">
          <div className="col-md-6 col-md-offset-3">
            <form>
              <div className="form-group">
                <label>Message:</label>
                <input name="message" type="text" className="form-control" onChange={this.handleChange} value={this.state.message}></input>
              </div>
              <button type="button" onClick={this.messageOwner} className="btn btn-primary">Send</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Message;