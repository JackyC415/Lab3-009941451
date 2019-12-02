//References: https://react-bootstrap.github.io/components/forms/

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';
import cookie from 'react-cookies';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import '../../App.css'

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            authFlag: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let credential = {
            email: this.state.email,
            password: this.state.password
        }
        //this.props.loginUser(credential);
        this.sendRestAPI(credential);
    }

    sendRestAPI = (data) => {
        axios.defaults.withCredentials = true;
        axios.post('/login', data)
            .then(res => {
                console.log("Status Code : ", res.status);
                if (res.status === 200) {
                    this.setState({ authFlag: true })
                } else {
                    this.setState({ authFlag: false })
                }
                console.log(res.token);
            });
    }

    render() {
        let redirectHome = null;
        if (cookie.load('cookie')) {
            redirectHome = <Redirect to="/" />
        }
        return (
            <div>{redirectHome}
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <h2>Login</h2>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" value={this.state.email} onChange={this.handleChange} required />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="At least 6 characters" minLength="6" maxLength="16" value={this.state.password} onChange={this.handleChange} required />
                    </Form.Group>
                    <Button variant="primary" type="submit">Login</Button>
                    <div>New? <Link to="/register">Create account</Link></div>
                    <div>{this.state.output}</div>
                </Form>
            </div>
        )
    }
}

export default Login;