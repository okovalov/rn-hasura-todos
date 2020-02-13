import gql from "graphql-tag"

export const getTodos = gql`
  {
    todos {
      id
      text
      is_completed
    }
  }
`
