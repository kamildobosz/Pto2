import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native'

const LoginScreen = ({ onLoginSuccess }) => {
  const [login, setLogin] = useState('')
  const [loginStatus, setLoginStatus] = useState(null)

  const calculateControlDigit = (digits) => {
    let sum = 0
    for (let i = 0; i < 6; i++) {
      sum += digits[i] * (i + 1)
    }
    return sum % 11
  }

  const handleLogin = () => {
    const pwzDigits = login.split('').map(Number)

    if (
      pwzDigits.length === 7 &&
      pwzDigits[0] !== 0 &&
      calculateControlDigit(pwzDigits.slice(1, 8)) === pwzDigits[0]
    ) {
      setLoginStatus('success')
      onLoginSuccess()
    } else {
      setLoginStatus('error')
    }
  }

  const getAdditionalTextStyle = () => {
    if (loginStatus === 'success') {
      return { color: 'green' }
    } else if (loginStatus === 'error') {
      return { color: 'red' }
    }
    return {}
  }

  const getAdditionalText = () => {
    if (loginStatus === 'success') {
      return 'Zalogowano poprawnie!'
    } else if (loginStatus === 'error') {
      return 'Błąd logowania. Sprawdź numer PWZ.'
    }
    return ''
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.buttonText, getAdditionalTextStyle()]}>{getAdditionalText()}</Text>

      <Image source={require('./assets/pto.jpg')} style={styles.logo} />

      <TextInput
        style={styles.input}
        placeholder="Wprowadź numer PWZ"
        value={login}
        onChangeText={(text) => setLogin(text)}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Zaloguj się</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
    marginTop: 40,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 200,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#004b77',
    padding: 10,
    borderRadius: 5,
    width: 200,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    width: 180,
  },
})

export default LoginScreen
