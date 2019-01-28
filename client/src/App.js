import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'

// Import Components
import Header from './components/Header'
import Customers from './components/Customers'

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  onError: ({networkError, graphQLErrors}) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  }
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Header />
        <div className="container">
          <Customers />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
