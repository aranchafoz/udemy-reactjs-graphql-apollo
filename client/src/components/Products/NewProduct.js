import React, {Component, Fragment} from 'react';

import {NEW_PRODUCT} from '../../mutations'
import {Mutation} from 'react-apollo'

const initialState = {
  name: '',
  price: '',
  stock: ''
}

class NewProduct extends Component {
  state = {
    ...initialState
  }

  cleanState = () => {
    this.setState({...initialState})
  }

  updateState = e => {
    const {name, value} = e.target
    this.setState({[name]: value})
  }

  validateForm = () => {
    const {name, price, stock} = this.state
    const invalid = !name || !price || !stock
    return invalid
  }

  createNewProduct = (e, newProduct) => {
    e.preventDefault()

    newProduct().then(data => {
      // Clean state
      this.cleanState()

      // Redirect
      this.props.history.push('/products')
    })
  }

  render() {
    const {name, price, stock} = this.state
    const input = {
      name,
      price: Number(price),
      stock: Number(stock)
    }

    return (
      <Fragment>
        <h1 className="text-center mb-5">New Product</h1>
        <div className="row justify-content-center">
          <Mutation
            mutation={NEW_PRODUCT}
            variables={{input}}
            >
          {(newProduct, {loading, error, data}) => {
              return (
                <form
                  className="col-md-8"
                  onSubmit={e => this.createNewProduct(e, newProduct)}
                >
                  <div className="form-group">
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Product's name"
                      onChange={e => this.updateState(e)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Price:</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <div className="input-group-text">$</div>
                      </div>
                      <input
                        type="number"
                        name="price"
                        className="form-control"
                        placeholder="Product's price"
                        onChange={e => this.updateState(e)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Stock:</label>
                    <input
                      type="number"
                      name="stock"
                      className="form-control"
                      placeholder="Product's stock"
                      onChange={e => this.updateState(e)}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={this.validateForm()}
                    className="btn btn-success float-right">
                      Create Product
                  </button>
                </form>
              )
          }}

          </Mutation>
        </div>
      </Fragment>
    )
  }
}

export default NewProduct
