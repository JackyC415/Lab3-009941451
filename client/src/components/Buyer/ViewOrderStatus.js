import React, { Component } from 'react';
import { withRouter } from 'react-router';

class ViewOrderStatus extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{this.props.obj.order_name}</td>
                <td>{this.props.obj.order_quantity}</td>
                <td>{this.props.obj.order_price}</td>
                <td>{this.props.obj.order_status}</td>
                <td>{this.props.obj.buyer}</td>
                <td>{this.props.obj.date}</td>
            </tr>
        );
    }
}

export default withRouter(ViewOrderStatus);
