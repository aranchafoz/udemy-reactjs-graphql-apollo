import React, { Component, Fragment } from 'react';
import { CUSTOMER_QUERY } from '../../queries'
import { Query } from 'react-apollo'

import EditCustomerForm from './EditCustomerForm'

class EditCustomer extends Component {
  state = {}
  render() {
    const {id} = this.props.match.params
    return (
      <Fragment>
        <h2 className="text-center">Edit Customer</h2>
        <div className="row justify-content-center">
          <Query query={CUSTOMER_QUERY} variables={{id}}>
            {({loading, error, data, refetch}) => {
              if(loading) return 'Loading...'
              if(error) return `Error! ${error.message}`

              console.log(this.props)
              return (
                <EditCustomerForm
                  customer={data.getCustomer}
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

export default EditCustomer
