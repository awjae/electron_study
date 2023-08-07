import pg from 'pg'
const { Pool } = pg
import graphql from 'graphql'
const { buildSchema } = graphql

export default class PgPool {
  constructor() {
    this.pool = new Pool({
      host: 'svc.sel3.cloudtype.app',
      port: 30641,
      // database: 'trip_genie',
      database: 'postgres',
      user: 'admin',
      password: 'admin',
    })
    this.userSchema = buildSchema(`
      type User {
        id: Int
        name: String
        age: Int
        email: String
      }
    
      type Query {
        getUser(id: Int!): User
        getUsers: [User]
      }
    `)
    this.userRoot = {
      getUser: async ({ id }) => {
        const query = 'SELECT * FROM users WHERE id = $1'
        const params = [id]
        const result = await runQuery(query, params)
        return result[0]
      },
      getUsers: async () => {
        const query = 'SELECT * FROM users'
        const result = await this.runQuery(query)
        return result
      },
    }
    this.todoListSchema = buildSchema(`
      type TodoList {
        no: Int
        date: String
        state: String
        contents: String
      }

      type Query {
        getTodoList: [TodoList]
      }
    `)
    this.todoListRoot = {
      getTodoList: async () => {
        const query = `SELECT * FROM public.todolist`
        const result = await this.runQuery(query)
        return result
      },
    }
  }
  async runQuery(query, params) {
    try {
      const client = await this.pool.connect()
      const result = await client.query(query, params)
      client.release()
      return result.rows
    } catch (error) {
      throw new Error(`Error executing query: ${error}`)
    }
  }
}
