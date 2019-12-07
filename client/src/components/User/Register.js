import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { graphql } from 'react-apollo';
import { registerMutation } from '../../mutation/mutations';
import '../../App.css';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            restaurantName: '',
            cuisine: '',
            owner: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.switchForm = this.switchForm.bind(this);
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (!this.state.owner) {
            console.log('Not owner');
            this.props.registerMutation({
                variables: {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    password: this.state.password
                }
            });
        } else {
            console.log('Owner');
            this.props.registerMutation({
                variables: {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    password: this.state.password,
                    restaurantName: this.state.restaurantName,
                    owner: this.state.owner
                }
            });
        }
    }

    switchForm = (e) => {
        (!this.state.owner) ? this.setState({ owner: true }) : this.setState({ owner: false });
    }

    render() {
        let ownerForm = null;
        let accountType = "Owner";

        if (this.state.owner) {
            ownerForm =
                <div>
                    <Form.Group controlId="formRestaurantname">
                        <Form.Label>Restaurant Name:</Form.Label>
                        <Form.Control
                            type="text"
                            name="restaurantName"
                            maxLength="30"
                            placeholder="Restaurant name"
                            value={this.state.restaurantName}
                            onChange={this.handleChange}
                            required />
                    </Form.Group>
                    <Form.Group controlId="formCuisine">
                        <Form.Label>Cuisine:</Form.Label>
                        <Form.Control
                            type="text"
                            name="cuisine"
                            maxLength="30"
                            placeholder="Cuisine type"
                            value={this.state.cuisine}
                            onChange={this.handleChange}
                            required />
                    </Form.Group>
                </div>
            accountType = "User";
        }

        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <h2>Create account</h2>
                    <Form.Group controlId="formFirstname">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            type="text"
                            name="firstName"
                            placeholder="Your first name"
                            minLength="3"
                            maxLength="30"
                            value={this.state.firstName}
                            onChange={this.handleChange}
                            required />
                    </Form.Group>
                    <Form.Group controlId="formLastname">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            type="text"
                            name="lastName"
                            placeholder="Your last name"
                            minLength="3"
                            maxLength="30"
                            value={this.state.lastName}
                            onChange={this.handleChange}
                            required />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Example@gmail.com"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            required />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="At least 6 characters"
                            minLength="6"
                            maxLength="16"
                            value={this.state.password}
                            onChange={this.handleChange}
                            required />
                    </Form.Group>
                    {ownerForm}
                    <Button variant="primary" type="submit">
                        Register
                    </Button> &nbsp;
                    <Button onClick={this.switchForm}>Sign Up as {accountType}</Button>
                    <div> {this.state.output} </div>
                </Form>
            </div>
        )
    }
}

export default graphql(registerMutation, { name: "registerMutation" })(Register);