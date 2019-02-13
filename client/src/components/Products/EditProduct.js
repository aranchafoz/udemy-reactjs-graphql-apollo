import React, {Component, Fragment} from 'react';

import {Query} from 'react-apollo'

import {PRODUCT_QUERY} from '../../queries'

import EditProductForm from './EditProductForm'

class EditProduct extends Component {
  state = {}

  render() {
    const {id} = this.props.match.params
    console.log(id)
    return (
      <Fragment>
        <h1 className="text-center">Edit Product</h1>

      <div className="row justify-content-center">
        <Query query={PRODUCT_QUERY} variables={{id}}>
          {({loading, error, data, refetch}) => {
            if(loading) return 'Loading...'
            if(error) return `Error! ${error.message}`

            return (
              <EditProductForm
                product={data.getProduct}
                id={id}
                refetch={refetch}
              />
            )
          }}
        </Query>

      </div>
    </Fragment>
    )
  }
}

export default EditProduct
