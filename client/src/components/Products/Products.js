import React, {Component, Fragment} from 'react';

import {Link} from 'react-router-dom'
import {Query, Mutation} from 'react-apollo'

import { PRODUCTS_QUERY } from '../../queries'
import { DELETE_PRODUCT } from '../../mutations'

import Success from '../Alerts/Success'

class Products extends Component {
  state = {
    alert: {
      show: false,
      message: ''
    }
  }
  render() {
    const {alert: {show, message}} = this.state
    const alert = (show) ? <Success message={message} /> : ''
    return (
      <Fragment>
        <h1 className="text-center mb-5">Products</h1>
        {alert}
        <Query query={PRODUCTS_QUERY} pollInterval={1000} /*variables={{limit: this.limit, offset: this.state.pager.offset}}*/>
          {({ loading, error, data, startPolling, stopPolling }) => {
            if(loading) return "Loading..."
            if(error) return `Error: ${error.message}`

            return (
              <table className="table">
                <thead>
                  <tr className="table-primary">
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Delete</th>
                    <th scope="col">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {data.getProducts.map(item => {
                    const {id} = item

                    return (
                      <tr key={id}>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.stock}</td>
                        <td>
                          <Mutation
                            mutation={DELETE_PRODUCT}
                            onCompleted={(data) => {
                              this.setState({
                                alert: {
                                  show: data.deleteProduct,
                                  message: 'Product deleted successfully'
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
                            {deleteProduct => (
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => {
                                  if(window.confirm("Are you sure you want to delete this product?")) {
                                    deleteProduct({variables: {id}})
                                  }
                                }}
                                >
                                &times; Delete
                              </button>
                            )}
                          </Mutation>
                        </td>
                        <td>
                          <Link to={`/product/edit/${id}`} className="btn btn-success">
                            Edit Product
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )
          }}
          </Query>
        </Fragment>
    )
  }
}

export default Products
