import React, { useState, useEffect } from "react";
import { View, Text } from 'react-native';
import { PropTypes } from "prop-types";
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'
import { GRAPHQL_ENDPOINT } from "../config";

//apollo-boost @apollo/react-hooks graphql

const Main = ({ token }) => {
  const [client, setClient] = useState(null)

  useEffect(() => {
    setClient(
      new ApolloClient({
        uri: GRAPHQL_ENDPOINT,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    )
  }, [])

  if (!client) {
    return (<View><Text>Loading...</Text></View>)
  }

  return (
    <ApolloProvider client={ client }>
      <View>
        <Text>Todo List</Text>
      </View>
    </ApolloProvider>
  )
}

Main.propTypes = {
  token: PropTypes.string.isRequired,
}

export default Main
