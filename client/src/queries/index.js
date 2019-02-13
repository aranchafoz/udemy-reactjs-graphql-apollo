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

export const PRODUCTS_QUERY = gql`
  query getProducts($limit: Int, $offset: Int){
  	getProducts(limit: $limit, offset: $offset) {
      id
      name
      price
      stock
    }
  }
`

export const PRODUCT_QUERY = gql`
  query ConsultProduct($id: ID){
  	getProduct(id: $id) {
      name
      price
      stock
    }
  }
`
