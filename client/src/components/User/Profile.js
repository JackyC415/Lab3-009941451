import React, { Component } from 'react';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import { graphql, compose } from 'react-apollo';
import { updateProfileMutation } from '../../mutation/mutations';
import { getProfileQuery } from "../../queries/queries";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            restaurantName: '',
            cuisine: '',
            output: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    updateOwner = (e) => {
        e.preventDefault();
        this.props.updateProfileMutation({
            variables: {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                restaurantName: this.state.restaurantName,
                cuisine: this.state.cuisine
            }
        }).then(res => {
            this.setState({ output: res.data })
        });
    }

    updateBuyer = (e) => {
        e.preventDefault();
        this.props.updateProfileMutation({
            variables: {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email
            }
        }).then(res => {
            this.setState({ output: res.data })
        });
    }

    render() {
        let data = this.props.getProfileQuery;
        if (!data.loading) {
            this.state.firstName = data.getUserProfile.firstName;
            this.state.lastName = data.getUserProfile.lastName;
            this.state.email = data.getUserProfile.email;
            this.state.restaurantName = data.getUserProfile.restaurantName;
            this.state.cuisine = data.getUserProfile.cuisine;
        }
        let renderPage = 'No Profile Found!';
        if (!cookie.load('cookie')) {
            renderPage = <Redirect to="/login" />
        } else if (cookie.load('cookie') === 'owner') {
            renderPage =
                <div>
                    First name: <input type="text" name="firstName" defaultValue={this.state.firstName} onChange={this.handleChange} required></input><br />
                    Last name: <input type="text" name="lastName" defaultValue={this.state.lastName} onChange={this.handleChange} required></input><br />
                    Email: <input type="email" name="email" defaultValue={this.state.email} onChange={this.handleChange} required ></input><br />
                    Restaurant: <input type="text" name="restaurantName" defaultValue={this.state.restaurantName} onChange={this.handleChange} required></input><br />
                    Cuisine: <input type="text" name="cuisine" defaultValue={this.state.cuisine} onChange={this.handleChange} required></input><br />
                    <button onClick={this.updateOwner}>Update Profile</button>
                </div>
        } else if (cookie.load('cookie') === 'buyer') {
            renderPage =
                <div>
                    First name: <input type="text" name="firstName" defaultValue={this.state.firstName} onChange={this.handleChange} required></input><br />
                    Last name: <input type="text" name="lastName" defaultValue={this.state.lastName} onChange={this.handleChange} required></input><br />
                    Email: <input type="email" name="email" defaultValue={this.state.email} onChange={this.handleChange} required ></input><br />
                    <button onClick={this.updateBuyer}>Update Profile</button>
                </div>
        }
        return <div>
            {renderPage}
            <div> {this.state.output} </div>
        </div>
    }
}

export default compose(
    graphql(getProfileQuery, { name: "getProfileQuery" }),
    graphql(updateProfileMutation, { name: "updateProfileMutation" })
)(Profile);