import React, {Component} from 'react';

import {Mutation} from 'react-apollo'

import {UPDATE_PRODUCT} from '../../mutations'

import {withRouter} from 'react-router-dom'

const initialState = {
  name: '',
  price: '',
  stock: ''
}

class EditProductForm extends Component {
  state = {
    ...this.props.product
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

  editProduct = (e, updateProduct) => {
    e.preventDefault()

    updateProduct().then(data => {
      console.log(data)
    })
  }

  render() {
    const {name, price, stock} = this.state
    const {id} = this.props
    const input = {
      id,
      name,
      price: Number(price),
      stock: Number(stock)
    }

    return (
      <Mutation
        mutation={UPDATE_PRODUCT}
        variables={{input}}
        key={this.props.id}
        onCompleted={() => this.props.refetch().then(() => {
          this.props.history.push('/products')
        })}
      >
      {(updateProduct, {loading, error, data}) => {
        return (
          <form
            className="col-md-8"
            onSubmit={e => this.editProduct(e, updateProduct)}
          >
            <div className="form-group">
              <label>Name:</label>
              <input
                onChange={this.updateState}
                type="text"
                name="name"
                className="form-control"
                placeholder="Product's name"
                value={name}
              />
            </div>
            <div className="form-group">
              <label>Price:</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">$</div>
                </div>
                <input
                  onChange={this.updateState}
                  type="number"
                  name="price"
                  className="form-control"
                  placeholder="Product's price"
                  value={price}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Stock:</label>
              <input
                onChange={this.updateState}
                type="number"
                name="stock"
                className="form-control"
                placeholder="Product's stock"
                value={stock}
              />
            </div>
            <button
              disabled={ this.validateForm() }
              type="submit"
              className="btn btn-success float-right">
                Save Changes
            </button>
          </form>
        )
      }}
      </Mutation>
    )
  }
}

export default withRouter(EditProductForm)
