import React, { Component, Fragment } from 'react';
import { ApolloProvider } from 'react-apollo'
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Import Components
import Header from './components/Header'
import Customers from './components/Customers'
import EditCustomer from './components/EditCustomer'
import NewCustomer from './components/NewCustomer'

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache({
    addTypename: false
  }),
  onError: ({networkError, graphQLErrors}) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  }
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Fragment>
              <Header />
              <div className="container">
                <Switch>
                  <Route exact path="/" component={Customers} />
                  <Route exact path="/customer/edit/:id" component={EditCustomer} />
                  <Route exact path="/customer/new" component={NewCustomer} />
                </Switch>
              </div>
          </Fragment>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
