import React, { Component } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import styles from './styles'

class HomePage extends Component {
  async userLogout () {
    try {
      await AsyncStorage.removeItem('id_token')
      await AsyncStorage.removeItem('access_token')
      Alert.alert('Logout Success!')
      Actions.Authentication()
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message)
    }
  }

  getProtectedQuote () {
    AsyncStorage.getItem('access_token').then((token) => {
    // TODO: localhost doesn't work because the app is running inside an emulator. Get the IP address with ifconfig.
      fetch('http://127.0.0.1:3001/api/protected/random-quote', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
      })
        .then((response) => response.text())
        .then((quote) => {
          Alert.alert('Chuck Norris Quote', quote)
        })
        .done()
  })
  }

  render () {
    return (
      <View style={styles.container}>
        <Image source={require('../images/chuck_norris.png')} style={styles.image}/>

        <TouchableOpacity style={styles.buttonWrapper} onPress={this.getProtectedQuote}>
          <Text style={styles.buttonText}> Get Chuck Norris quote! </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonWrapper} onPress={this.userLogout}>
          <Text style={styles.buttonText} > Log out </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default HomePage
