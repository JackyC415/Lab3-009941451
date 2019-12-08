import React, { Component } from 'react';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import { graphql, compose } from 'react-apollo';
import { updateUserProfileMutation, getUserProfileMutation } from '../../mutation/mutations';

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

    componentDidMount() {
        this.props.getUserProfileMutation({
            variables: {
                email: this.state.output
            }
        }).then(res => {
            this.setState({
                firstName: res.data.getUserProfile.firstName,
                lastName: res.data.getUserProfile.lastName,
                email: res.data.getUserProfile.email,
                restaurantName: res.data.getUserProfile.restaurantName,
                cuisine: res.data.getUserProfile.cuisine
            })
        })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    updateOwner = (e) => {
        e.preventDefault();
        this.props.updateUserProfileMutation({
            variables: {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                restaurantName: this.state.restaurantName,
                cuisine: this.state.cuisine
            }
        }).then(res => {
            this.setState({ output: 'Updated Profile Successfully!' })
        });
    }

    updateBuyer = (e) => {
        e.preventDefault();
        this.props.updateUserProfileMutation({
            variables: {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email
            }
        }).then(res => {
            this.setState({ output: 'Updated Profile Successfully!' })
        });
    }

    render() {
        let renderPage = 'No Profile Found!';
        if (!cookie.load('cookie')) {
            renderPage = <Redirect to="/login" />
        } else if (cookie.load('cookie') === 'owner') {
            renderPage =
                <div>
                    <h1>Owner's Profile</h1>
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
                    <h1>Buyer's Profile</h1>
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
    graphql(getUserProfileMutation, { name: "getUserProfileMutation" }),
    graphql(updateUserProfileMutation, { name: "updateUserProfileMutation" })
)(Profile);