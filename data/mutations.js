import gql from "graphql-tag"

export const INSERT_USERS = gql`
  mutation($id: String, $name: String) {
    insert_users( objects: [ { id: $id, name: $name } ]) {
      affected_rows
    }
  }
`
