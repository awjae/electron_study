import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import graphql from 'graphql';
const { buildSchema } = graphql;
import PgPool from './pgPool.js'

const schema = buildSchema(`
  type Query {
    hello: String
    persons: [Person]
  }

  type Person {
    name: String
    age: Int
  }
`)

const root = {
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
const pool = new PgPool()

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
    schema: pool.userSchema,
    rootValue: pool.userRoot,
    graphiql: true,
  }),
)

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'))
