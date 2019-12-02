import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Navbar from './Navbar/Navbar';
import Login from './User/Login';
import Register from './User/Register';
import Profile from './User/Profile';

import OwnerHome from './Owner/Homepage';
import OwnerMenu from './Owner/Menu';
import UpdateMenuItem from './Owner/UpdateMenuItem';
import AddMenuItem from './Owner/AddMenuItem';
import ViewOrder from './Owner/ViewOrder';
import Inbox from './Owner/Inbox';
import Reply from './Owner/Reply';

import Search from './Buyer/Search';
import ViewCart from './Buyer/ViewCart';
import AddToCart from './Buyer/AddToCart';
import Message from './Buyer/Message';
import Dialog from './Buyer/Dialog';
import ViewPastOrders from './Buyer/ViewPastOrders';

//Create a Main Component
class Main extends Component {
    render() {
        return (
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={Navbar} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/profile" component={Profile} />
                <Route path="/viewCart" component={ViewCart} />
                <Route path="/addToCart" component={AddToCart} />
                <Route path="/getItemToEdit/:id" component={UpdateMenuItem} />
                <Route path="/addMenuItem" component={AddMenuItem} />
                <Route path="/ownerhome" component={OwnerHome} />
                <Route path="/ownerhome/menu" component={OwnerMenu} />
                <Route path="/search/pagination" component={Search} />
                <Route path="/ownerhome/vieworder" component={ViewOrder} />
                <Route path="/messageOwner/:id" component={Message} />
                <Route path="/replyMessage/:id" component={Reply} />
                <Route path="/inbox" component={Inbox} />
                <Route path="/dialog" component={Dialog} />
                <Route path="/viewPastOrder" component={ViewPastOrders} />
            </div>
        )
    }
}
//Export The Main Component
export default Main;