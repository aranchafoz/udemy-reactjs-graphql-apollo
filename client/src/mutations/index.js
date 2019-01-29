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
