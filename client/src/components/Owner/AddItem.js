import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getItemsQuery } from '../../queries/queries';
import { addItemMutation } from '../../mutation/mutations';

class AddItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            section: ''
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitForm(e) {
        e.preventDefault()
        console.log(this.state);
        this.props.addItemMutation({
            variables: {
                name: this.state.name,
                section: this.state.section
            },
            refetchQueries: [{ query: getItemsQuery }]
        });
    }

    render() {
        return (
            <form id="add-item" onSubmit={this.submitForm.bind(this)} >
                <div>
                    <label>Item Name:</label>
                    <input type="text" name="name" defaultValue={this.state.name} placeholder="enter item name" onChange={this.handleChange} required></input><br />
                </div>
                <div>
                    <label>Item Section:</label>
                    <input type="text" name="section" defaultValue={this.state.section} placeholder="enter section name" onChange={this.handleChange} required></input><br />
                </div>
                <button>Submit</button>
            </form>
        );
    }
}

export default compose(
    graphql(getItemsQuery, { name: "getItemsQuery" }),
    graphql(addItemMutation, { name: "addItemMutation" })
)(AddItem);