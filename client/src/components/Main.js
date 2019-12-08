import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Navbar from './Navbar/Navbar';
import Login from './User/Login';
import Register from './User/Register';
import Profile from './User/Profile';

import OwnerHome from './Owner/Homepage';
import BuyerHome from './Buyer/Homepage';

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
                <Route path="/ownerhome" component={OwnerHome} />
                <Route path="/buyerhome" component={BuyerHome} />

            </div>
        )
    }
}
//Export The Main Component
export default Main;