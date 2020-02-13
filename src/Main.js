import React, { useState, useEffect } from "react";
import { View, Text } from 'react-native';
import { PropTypes } from "prop-types";
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'
import { GRAPHQL_ENDPOINT } from "../config";
import { insertUsers } from "../data/mutations";

//apollo-boost @apollo/react-hooks graphql

const Main = ({ token, user }) => {
  const [client, setClient] = useState(null)

  useEffect(() => {
    const { id, name, isNewUser } = user

    const client = new ApolloClient({
      uri: GRAPHQL_ENDPOINT,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (isNewUser) {
      console.log('going to create! ', user)
      client.mutate({
        mutation: insertUsers,
        variables: { id, name }
      })
    }

    setClient(client)

  }, [])

  if (!client) {
    return (<View><Text>Loading...</Text></View>)
  }

  return (
    <ApolloProvider client={ client }>
      <View>
        <Text>Welcome {user.name}! Todo List</Text>
      </View>
    </ApolloProvider>
  )
}

Main.propTypes = {
  token: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
}

export default Main
