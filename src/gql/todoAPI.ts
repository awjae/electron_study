import { useMutation, gql, useQuery } from '@apollo/client'

export const getTodoList = gql`
  query {
    getTodoList {
      no
      date
      state
      contents
    }
  }
`
export const postTodoList = gql`
  mutation createTodoList($contents: String!) {
    createTodoList(contents: $contents) {
      contents
    }
  }
`
export const patchTodo = gql`
  mutation updateTodo($no: Int!, $state: String!) {
    updateTodo(no: $no, state: $state) {
      no
      state
    }
  }
`
