import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from "./src/Main"
import Auth from "./src/Auth"
import { ID_TOKEN_KEY } from "./config";
import * as SecureStore from "expo-secure-store";

const App = () => {
  const [token, setToken] = useState(null)

  useEffect(() => {
    handleLogin()
  }, [])

  const handleLogin = () => {
    SecureStore.getItemAsync(ID_TOKEN_KEY).then(session => {
      if (session) {
        const sessionObj = JSON.parse(session)
        const { exp, token } = sessionObj
        if (exp > Math.floor(new Date().getTime() / 1000)) {
          setToken(token)
        }
      }
    })
  }
  return (
    <View style={styles.container}>
      { token && <Main token={ token } /> }
       <Auth
        token={ token }
        onLogin={ handleLogin }
        onLogout={ () => setToken(null) } />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App
