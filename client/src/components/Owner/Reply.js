import React, { Component } from 'react';
import axios from 'axios';

class Reply extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reply: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  replyBuyer = (e) => {
    e.preventDefault();
    let data = {
        buyer: this.props.match.params.id,
        message: this.state.reply
    }

    axios.post('/replyBuyer', data)
      .then(res => {
        alert('Replied!');
        console.log(JSON.stringify(res));
      }).catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <h1 className="text-center">Message Buyer</h1>
        <div className="row justify-content-md-center">
          <div className="col-md-6 col-md-offset-3">
            <form>
              <div className="form-group">
                <label>Reply Buyer:</label>
                <input name="reply" type="text" className="form-control" onChange={this.handleChange} value={this.state.reply}></input>
              </div>
              <button type="button" onClick={this.replyBuyer} className="btn btn-primary">Reply</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Reply;