import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'
import { userRoot, userSchema } from './pg'

var schema = buildSchema(`
  type Query {
    hello: String
    persons: [Person]
  }

  type Person {
    name: String
    age: Int
  }
`)

var root = {
  hello: () => 'Hello world!',
  persons: () => {
    return [
      { name: 'kim', age: 20 },
      { name: 'lee', age: 30 },
      { name: 'park', age: 40 },
    ]
  },
}

const app = express()

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
)
app.use(
  '/user',
  graphqlHTTP({
    schema: userSchema,
    rootValue: userRoot,
    graphiql: true,
  }),
)

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'))
