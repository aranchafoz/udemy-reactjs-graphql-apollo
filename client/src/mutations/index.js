import gql from 'graphql-tag'

export const NEW_CUSTOMER = gql`
  mutation createCustomer($input: CustomerInput) {
    createCustomer(input:$input) {
      id
      name
      surname

    }
  }
`

export const UPDATE_CUSTOMER = gql`
  mutation UpdateCustomer($input: CustomerInput) {
    updateCustomer(input: $input) {
      id
      name
      surname
      company
      age
      type
      emails{
        email
      }
    }
  }
`

export const DELETE_CUSTOMER = gql`
  mutation deleteCustomer($id: ID!){
    deleteCustomer(id: $id)
  }
`

export const NEW_PRODUCT = gql`
  mutation createProduct($input: ProductInput){
    createProduct(input: $input) {
      id
      name
    }
  }
`

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($input: ProductInput) {
    updateProduct(input: $input) {
      name
      price
      stock
    }
  }
`

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID) {
    deleteProduct(id: $id)
  }
`
