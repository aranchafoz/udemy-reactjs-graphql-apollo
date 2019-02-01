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
