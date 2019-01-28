import gql from 'graphql-tag'

export const CUSTOMERS_QUERY = gql`{
  getCustomers{
    id
    name
    surname
    company
  }
}`
