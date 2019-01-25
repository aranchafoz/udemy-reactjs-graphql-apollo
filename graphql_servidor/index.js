import express from 'express'
// graphql
import graphqlHTTTP from 'express-graphql'
import { schema } from './data/schema'

const app = express()

app.get('/', (req, res) => {
  res.send('Ready')
})

app.use('/graphql', graphqlHTTTP({
  // schema which wil be use it
  schema,
  // use graphiql
  graphiql : true
}))

app.listen(8000, () => console.log('Server is running'))
