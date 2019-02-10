import mongoose from 'mongoose'

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/customers', {useNewUrlParser: true})

mongoose.set('setFindAndModify', false)

// Customers
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

// Products
const productsSchema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: Number
})

const Products = mongoose.model('products', productsSchema)

export {Customers, Products}
