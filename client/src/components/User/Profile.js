import React, { Component } from 'react';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            restaurantName: '',
            cuisine: '',
            output: '',
            loading: false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        /*
        axios.get('/getProfile')
            .then(res => {
                if (res.status === 200) {
                    this.setState({ firstName: res.data.firstName });
                    this.setState({ lastName: res.data.lastName });
                    this.setState({ email: res.data.email });
                    this.setState({ restaurantName: res.data.restaurantName });
                    this.setState({ cuisine: res.data.cuisine });
                    this.setState({ loading: true });
                }
            }).catch((err) => {
                console.log(err);
            })
        */
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
        let renderPage = 'No Profile Found!';
        if (!cookie.load('cookie')) {
            renderPage = <Redirect to="/login" />
        } else if (this.state.loading && cookie.load('cookie') === 'owner') {
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

export default Profile;