import React, {Component} from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import {Platform, StyleSheet, Text, View, ActivityIndicator} from 'react-native'
import Routes from './routes/Routes'

class App extends Component {

  state = { hasToken: false, isLoaded: false }

  componentDidMount() {
    AsyncStorage.getItem('id_token').then((token) => {
      this.setState({ hasToken: token !== null, isLoaded: true })
    })
  }

  render() {
    return(
      !this.state.isLoaded
        ? <ActivityIndicator />
        : <Routes
            hasToken={this.state.hasToken}
          />
    )
  }
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
