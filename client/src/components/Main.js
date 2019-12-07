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

import ViewCart from './Buyer/ViewCart';
import AddToCart from './Buyer/AddToCart';

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
            </div>
        )
    }
}
//Export The Main Component
export default Main;