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
    getCustomer : (root, {id}) => {
      return new Promise((resolve, reject) => {
        Customers.findById(id, (error, customer) => {
          if(error) reject(error)
          else resolve(customer)
        })
      })
    },
    getCustomers : (root, {limit, offset}) => {
      return Customers.find({}).limit(limit).skip(offset)
    },
    totalCustomers: (root) => {
      return new Promise((resolve, reject) => {
        Customers.countDocuments({}, (error, count) => {
          if(error) reject(error)
          else resolve(count)
        })
      })
    }
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

      return new Promise((resolve, reject) => {
        newCustomer.save((error) => {
          if(error) reject(error)
          else resolve(newCustomer)
        })
      })

      customerDB[id] = input
      return new Customer(id, input)
    },
    updateCustomer : (root, {input}) => {
      return new Promise((resolve, reject) => {
        Customers.findOneAndUpdate({_id: input.id}, input, {new: true}, (error, customer) => {
          if(error) reject(error)
          else resolve(customer)
        })
      })
    },
    deleteCustomer : (root, {id}) => {
      return new Promise((resolve, reject) => {
        Customers.findOneAndRemove({_id: id}, (error) => {
          if(error) reject(error)
          else resolve(true)
        })
      })
    }
  }
}
