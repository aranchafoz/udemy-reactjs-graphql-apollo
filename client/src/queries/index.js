import gql from 'graphql-tag'

export const CUSTOMERS_QUERY = gql`
  query getCustomers($limit: Int, $offset: Int){
    getCustomers(limit: $limit, offset: $offset){
      id
      name
      surname
      company
    }
    totalCustomers
  }
`

export const CUSTOMER_QUERY = gql`
  query ConsultCustomer($id: ID){
    getCustomer(id: $id) {
      id
      name
      surname
      company
      age
      emails {
        email
      }
      type
    }
  }
`
