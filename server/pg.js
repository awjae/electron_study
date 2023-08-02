import { Pool } from 'pg'

export const pool = new Pool({
  user: 'admin',
  host: 'svc.sel3.cloudtype.app',
  database: 'trip_genie',
  password: 'admin',
  port: 30641,
})

// PostgreSQL 쿼리를 수행하는 함수
async function runQuery(query, params) {
  try {
    const client = await pool.connect()
    const result = await client.query(query, params)
    client.release()
    return result.rows
  } catch (error) {
    throw new Error(`Error executing query: ${error}`)
  }
}

// import { buildSchema } from 'graphql';

// // PostgreSQL 데이터베이스와 연동하여 스키마 정의
// var schema = buildSchema(`
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
// `);

// var root = {
//   getUser: async ({ id }) => {
//     const query = 'SELECT * FROM users WHERE id = $1';
//     const params = [id];
//     const result = await runQuery(query, params);
//     return result[0];
//   },
//   getUsers: async () => {
//     const query = 'SELECT * FROM users';
//     const result = await runQuery(query);
//     return result;
//   },
// };
