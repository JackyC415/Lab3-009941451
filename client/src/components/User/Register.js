/*References: https://react-bootstrap.github.io/components/forms/
https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-2-frontend-6eac4e38ee82*/

import React, { Component } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { register } from "../../actions/actions";
import '../../App.css';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            restaurantname: '',
            zipcode: '',
            cuisine: '',
            owner: false,
            errors: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.switchForm = this.switchForm.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    //send registration data to server for processing
    sendRestAPI = (data) => {
        axios.post('/register', data)
            .then(res => {
                console.log(res.data);
            });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const buyerData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }

        const ownerData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            restaurantname: this.state.restaurantname,
            zipcode: this.state.zipcode,
            owner: this.state.owner
        }

        if (!this.state.owner) {
            this.props.register(buyerData, this.props.history);
            this.sendRestAPI(buyerData);
        } else {
            this.props.register(ownerData, this.props.history);
            this.sendRestAPI(ownerData);
        }

    }

    switchForm = (e) => {
        (!this.state.owner) ? this.setState({ owner: true }) : this.setState({ owner: false });
    }

    render() {
        let ownerForm = null;
        let accountType = "Owner";
        const { errors } = this.state;

        if (this.state.owner) {
            ownerForm =
                <div>
                    <Form.Group controlId="formRestaurantname">
                        <Form.Label>Restaurant Name:</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="restaurantname" 
                            maxLength="30" 
                            placeholder="Restaurant name" 
                            value={this.state.restaurantname} 
                            onChange={this.handleChange} 
                            required />
                    </Form.Group>
                    <Form.Group controlId="formZipcode">
                        <Form.Label>Zipcode:</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="zipcode" 
                            maxLength="5" 
                            placeholder="5 digits" 
                            value={this.state.zipcode} 
                            onChange={this.handleChange} 
                            required/>
                    </Form.Group>
                </div>
            accountType = "User";
        }

        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <h2>Create account</h2>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="name" 
                            placeholder="Your name" 
                            minLength="3" 
                            maxLength="30" 
                            value={this.state.name} 
                            onChange={this.handleChange} 
                            required />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            name="email" 
                            value={this.state.email} 
                            error={errors.email} 
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
                            error={errors.password} 
                            onChange={this.handleChange}
                            required />
                    </Form.Group>
                    {ownerForm}
                    <Button variant="primary" type="submit">
                        Register
                    </Button> &nbsp;
                    <Button onClick={this.switchForm}>Sign Up as {accountType}</Button>
                    <div>Already have an account? <Link to="/login">Login</Link></div><br />
                    <div> {this.state.output} </div>
                </Form>
            </div>
        )
    }
}

Register.propTypes = {
    register: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    errors: state.errors
  });
  
export default connect(mapStateToProps, { register })(withRouter(Register));