import express from 'express'
// graphql
import graphqlHTTTP from 'express-graphql'
import schema from './schema'

const app = express()

app.get('/', (req, res) => {
  res.send('Ready')
})

// resolver
const root = {hello: () => "Hello world from GraphQL"}

app.use('/graphql', graphqlHTTTP({
  // schema which wil be use it
  schema,
  // resolver is sent as rootValue
  rootValue: root,
  // use graphiql
  graphiql : true
}))

app.listen(8000, () => console.log('Server is running'))
