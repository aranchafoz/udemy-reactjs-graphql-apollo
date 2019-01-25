import express from 'express'
// graphql
import graphqlHTTTP from 'express-graphql'
import schema from './schema'
// resolvers
import resolvers from './resolvers'

const app = express()

app.get('/', (req, res) => {
  res.send('Ready')
})

app.use('/graphql', graphqlHTTTP({
  // schema which wil be use it
  schema,
  // resolver is sent as rootValue
  rootValue: resolvers,
  // use graphiql
  graphiql : true
}))

app.listen(8000, () => console.log('Server is running'))
