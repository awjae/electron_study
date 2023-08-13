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
    // this.userSchema = buildSchema(`
    //   type User {
    //     id: Int
    //     name: String
    //     age: Int
    //     email: String
    //   }

    //   type Query {
    //     getUser(id: Int!): User
    //     getUsers: [User]
    //   }
    // `)
    // this.userRoot = {
    //   getUser: async ({ id }) => {
    //     const query = 'SELECT * FROM users WHERE id = $1'
    //     const params = [id]
    //     const result = await runQuery(query, params)
    //     return result[0]
    //   },
    //   getUsers: async () => {
    //     const query = 'SELECT * FROM users'
    //     const result = await this.runQuery(query)
    //     return result
    //   },
    // }
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

      type Mutation {
        createTodoList(contents: String!): TodoList
        updateTodo($no: Number!, $state: String!): TodoList
      }
    `)
    this.todoListRoot = {
      getTodoList: async () => {
        const query = `SELECT * FROM public.todolist`
        const result = await this.runQuery(query)
        return result
      },
      createTodoList: async ({ contents }) => {
        const query = `INSERT INTO public.todolist(date, state, contents) VALUES (now(), 'ready', $1)`
        const params = [contents]
        const result = await this.runQuery(query, params)
        return result[0]
      },
      updateTodo: async ({ no, state }) => {
        const query = `UPDATE public.todolist SET state=$2 WHERE no = $1;`
        const params = [no, state]
        const result = await this.runQuery(query, params)
        return result[0]
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
