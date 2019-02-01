import gql from 'graphql-tag'

export const CUSTOMERS_QUERY = gql`{
  getCustomers{
    id
    name
    surname
    company
  }
}`

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
