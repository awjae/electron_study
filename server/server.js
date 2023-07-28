import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'

var schema = buildSchema(`
  type Query {
    hello: String
  }
`)

var root = { hello: () => 'Hello world!' }

const app = express()

app.get('/', (req, res) => {
  res.send('hello')
})

app.get(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
)

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'))
