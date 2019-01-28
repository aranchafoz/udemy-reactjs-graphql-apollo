import mongoose from 'mongoose'

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/customers', {useNewUrlParser: true})

// Define customer schema

const customersSchema = new mongoose.Schema({
  name: String,
  surname: String,
  company: String,
  emails: Array,
  age: Number,
  type: String,
  orders: Array
})

const Customers = mongoose.model('customers', customersSchema)

export {Customers}
