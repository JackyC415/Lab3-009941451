import React, { Component } from 'react';
import axios from 'axios';
import ReplyOwner from './ReplyOwner';

class Dialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: ''
        };
    }

    componentDidMount() {
        axios.get('/viewReply')
            .then(res => {
                this.setState({ messages: res.data });
            }).catch((err) => {
                console.log(err);
            });
    }

    tabRow() {
        if (this.state.messages instanceof Array) {
            return this.state.messages.map(function (object, i) {
                return <ReplyOwner obj={object} key={i} />;
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
                            <td>Owner</td>
                            <td>Reply</td>
                            <td>Date</td>
                        </tr>
                    </thead>
                    <tbody> {this.tabRow()} </tbody>
                </table>
            </div>
        );
    }
}

export default Dialog;
