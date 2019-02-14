import React, { Fragment, Component } from 'react';
import { Query, Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'

import { CUSTOMERS_QUERY } from '../../queries'
import { DELETE_CUSTOMER } from '../../mutations'

import Success from '../Alerts/Success'
import Pager from './../Pager'

class Customers extends Component {
  limit = 10

  state = {
    alert: {
      show: false,
      message: ''
    },
    pager: {
      actual: 1,
      offset: 0
    }
  }

  pagePrev = () => {
    this.setState({
      pager: {
        offset: this.state.pager.offset - this.limit,
        actual: this.state.pager.actual - 1
      }
    })
  }

  pageNext = () => {
    this.setState({
      pager: {
        offset: this.state.pager.offset + this.limit,
        actual: this.state.pager.actual + 1
      }
    })
  }

  render() {
    const {alert: {show, message}} = this.state
    const alert = (show) ? <Success message={message} /> : ''
    return (
      <Query query={CUSTOMERS_QUERY} pollInterval={1000} variables={{limit: this.limit, offset: this.state.pager.offset}}>
        {({ loading, error, data, startPolling, stopPolling }) => {
          if(loading) return "Loading..."
          if(error) return `Error: ${error.message}`
          console.log(data)

          return (
            <Fragment>
              <h2 className="text-center">Customers List</h2>
              {alert}
              <ul className="list-group mt-4">
                {data.getCustomers.map( item => (
                  <li key={item.id} className="list-group-item">
                    <div className="row justify-content-between align-items-center">
                      <div className="col-md-8 d-flex justify-content-between align-items-center">
                        {item.name} {item.surname}
                      </div>
                      <div className="col-md-4 d-flex justify-content-end">
                        <Mutation
                          mutation={DELETE_CUSTOMER}
                          onCompleted={(data) => {
                            this.setState({
                              alert: {
                                show: data.deleteCustomer,
                                message: 'Customer deleted successfully'
                              }
                            }, () => {
                              setTimeout(() => {
                                this.setState({
                                  alert: {
                                    show: false,
                                    message: ''
                                  }
                                })
                              }, 3000)
                            })
                          }}
                        >
                          {deleteCustomer => (
                            <button
                              type="button"
                              className="btn btn-danger d-block d-md-inline-block mr-2"
                              onClick={() => {
                                if(window.confirm('Are you sure you want to delete this customer?')) {
                                  const {id} = item
                                  deleteCustomer({variables: {id}})
                                }
                              }}
                            >
                              &times; Delete
                            </button>
                          )}
                        </Mutation>
                        <Link to={`/customer/edit/${item.id}`} className="btn btn-success d-block d-md-inline-block">
                          Edit Customer
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <Pager
                actual={this.state.pager.actual}
                total={data.totalCustomers}
                limit={this.limit}
                pagePrev={this.pagePrev}
                pageNext={this.pageNext}
              />
            </Fragment>
          )
        }}
      </Query>
    )
  }
}


export default Customers
