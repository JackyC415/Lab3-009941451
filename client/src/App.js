import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main';
import './App.css';

// apollo client setup
const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    credentials: 'include'
});

//App Component
class App extends Component {
  render() {
    return (
        <ApolloProvider client={client}>
        <BrowserRouter>
            <div>
              {/* App Component Has a Child Component called Main*/}
              <Main />
            </div>
          </BrowserRouter>
        </ApolloProvider>
    );
  }
}
export default App;
