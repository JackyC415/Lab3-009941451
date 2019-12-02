import React, { Component } from 'react';
import { Redirect } from 'react-router';
import cookie from 'react-cookies';
import axios from 'axios';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            restaurantname: '',
            phone: '',
            cuisine: '',
            output: '',
            loading: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        axios.get('/getProfile')
            .then(res => {
                if (res.status === 200) {
                    this.setState({ name: res.data.name });
                    this.setState({ email: res.data.email });
                    this.setState({ restaurantname: res.data.restaurantname });
                    this.setState({ phone: res.data.phone });
                    this.setState({ cuisine: res.data.cuisine });
                    this.setState({ loading: true });
                }
            }).catch((err) => {
                console.log(err);
            })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    updateProfile = (data) => {
        axios.post('/updateProfile', data)
            .then(res => {
                this.setState({ output: res.data })
            });
    }

    updateOwner = (e) => {
        e.preventDefault();

        const ownerData = {
            name: this.state.name,
            email: this.state.email,
            restaurantname: this.state.restaurantname,
            cuisine: this.state.cuisine
        }
        this.updateProfile(ownerData);
    }

    updateBuyer = (e) => {
        e.preventDefault();

        const buyerData = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone
        }
        this.updateProfile(buyerData);
    }

    render() {
        let renderPage = 'No Profile Found!';
        if (!cookie.load('cookie')) {
            renderPage = <Redirect to="/login" />
        } else if (this.state.loading && cookie.load('cookie') === 'owner') {
            renderPage =
                <div>
                    Name: <input type="text" name="name" defaultValue={this.state.name} onChange={this.handleChange} required></input><br />
                    Email: <input type="email" name="email" defaultValue={this.state.email} onChange={this.handleChange} required ></input><br />
                    Restaurant: <input type="text" name="restaurantname" defaultValue={this.state.restaurantname} onChange={this.handleChange} required></input><br />
                    Cuisine: <input type="text" name="cuisine" defaultValue={this.state.cuisine} onChange={this.handleChange} required></input><br />
                    Phone: <input type="text" name="phone" defaultValue={this.state.phone} onChange={this.handleChange} required></input><br />
                    <button onClick={this.updateOwner}>Update Profile</button>
                </div>
        } else if (cookie.load('cookie') === 'buyer') {
            renderPage =
                <div>
                    Name: <input type="text" name="name" defaultValue={this.state.name} onChange={this.handleChange} required></input><br />
                    Email: <input type="email" name="email" defaultValue={this.state.email} onChange={this.handleChange} required ></input><br />
                    Phone: <input type="text" name="phone" defaultValue={this.state.phone} onChange={this.handleChange} required></input><br />
                    <button onClick={this.updateBuyer}>Update Profile</button>
                </div>
        }
        return <div>
            <label for="avatar">Choose a profile picture:</label>
            <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg"></input>
            {renderPage}
            <div> {this.state.output} </div>
        </div>
    }
}

export default Profile;