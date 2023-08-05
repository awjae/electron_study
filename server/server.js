import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import graphql from 'graphql'
const { buildSchema } = graphql
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

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})
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
