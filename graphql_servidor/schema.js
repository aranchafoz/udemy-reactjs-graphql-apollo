import {buildSchema} from 'graphql'

const schema = buildSchema(`
  type Customer {
    id: ID
    name: String
    surname: String
    company: String
    email: String
  }

  type Query {
    customer: Customer
  }
`)

export default schema
