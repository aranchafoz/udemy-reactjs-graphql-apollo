import mongoose from 'mongoose'
import {Customers} from './db'

class Customer {
  constructor(id, {name, surname, company, emails, age, type, orders}) {
    this.id = id
    this.name = name
    this.surname = surname
    this.company = company
    this.emails = emails
    this.age = age
    this.type = type
    this.orders = orders
  }
}

// Aux DB
const customerDB = {}

export const resolvers = {
  Query: {
    getCustomer : ({id}) => new Customer(id, customerDB[id])
  },
  Mutation: {
    createCustomer : (root, {input}) => {
      const newCustomer = new Customers({
        name: input.name,
        surname: input.surname,
        company: input.company,
        emails: input.emails,
        age: input.age,
        type: input.type,
        orders: input.orders
      })

      newCustomer.id = newCustomer._id

      return new Promise((resolve, object) => {
        newCustomer.save((error) => {
          if(error) rejects(error)
          else resolve(newCustomer)
        })
      })

      customerDB[id] = input
      return new Customer(id, input)
    }
  }
}
