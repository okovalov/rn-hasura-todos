import React from "react";
import { Button, Alert } from "react-native";
import { PropTypes } from "prop-types";
import { AuthSession } from "expo";
import * as Random from "expo-random";
import * as SecureStore from "expo-secure-store";
import jwtDecoder from 'jwt-decode'
import queryString from 'query-string';

import {
  AUTH_CLIENT_ID,
  AUTH_DOMAIN,
  ID_TOKEN_KEY,
  AUTH_NAMESPACE,
  NONCE_KEY }
from "../config";

const generateNonce = async () => {
  const nonce = String.fromCharCode.apply(null, await Random.getRandomBytesAsync(16))
  await SecureStore.setItemAsync(NONCE_KEY, nonce)
  return nonce
}

const Auth = ({ onLogin, onLogout, token }) => {
  console.log('onLogin!', onLogin)

  const handleLoginPress = async () => {

    console.log('AUTH_DOMAIN', AUTH_DOMAIN)

    const nonce = await generateNonce();

    const authUrl = `${AUTH_DOMAIN}/authorize?` +
      queryString.stringify({
        client_id: AUTH_CLIENT_ID,
        response_type: 'id_token',
        scope: 'openid profile email',
        redirect_uri: AuthSession.getRedirectUrl(),
        nonce
      })

    console.log('authUrl', authUrl)

    AuthSession.startAsync({ authUrl }).then(result => {
        if (result.type === 'success') {
          decodeToken(result.params.id_token)
        } else if ( result.params && result.params.error) {
          Alert.alert('Error', result.params.error_description || 'Something went wrong while logging in')
        }
      })
  }

  const decodeToken = token => {
    const decodedToken = jwtDecoder(token)

    console.log('decodedToken', decodedToken)
    const { nonce, sub, email, name, exp } = decodedToken

    const tokenToSave = JSON.stringify({
        id: sub,
        email,
        name,
        exp,
        token
      })

    console.log('tokenToSave', tokenToSave)

    SecureStore.getItemAsync(NONCE_KEY).then(storedNonce => {
      console.log('storedNonce', storedNonce)
      if (nonce === storedNonce) {
        SecureStore.setItemAsync(
          ID_TOKEN_KEY, tokenToSave).then(() => { onLogin(decodedToken[AUTH_NAMESPACE].isNewUser) })
      } else {
        Alert.alert('Error', 'Nonces dont match')
        return
      }
    })

  }

  return token ?
    <Button title="Logout" onPress={ onLogout } /> :
    <Button title="Login" onPress={ handleLoginPress } />
}

Auth.propTypes = {
  token: PropTypes.string,
  onLogin: PropTypes.func,
  onLogout: PropTypes.func,
}

export default Auth
