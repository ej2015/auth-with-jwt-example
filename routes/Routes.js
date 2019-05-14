import React, {Component} from 'react'
import { Router, Scene} from 'react-native-router-flux'
import Authentication from './Authentication'
import HomePage from './Homepage'

class App extends Component {

  render() {
    const { hasToken } = this.props

    return(
      <Router>
        <Scene key='root'>
          <Scene
            component={Authentication}
            hideNavBar={false}
            initial={!hasToken}
            key='Authentication'
            title='Authentication'
          />
          <Scene
            component={HomePage}
            initial={hasToken}
            hideNavBar={true}
            key='HomePage'
            title='Home Page'
          />
        </Scene>
      </Router>
    )
  }
}

export default App
