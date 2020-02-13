import gql from "graphql-tag"

export const GET_TODOS = gql`
  {
    todos {
      id
      text
      is_completed
    }
  }
`
