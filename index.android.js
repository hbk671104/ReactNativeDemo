/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, Navigator } from 'react-native';
import HeadlineListScene from './HeadlineListScene';
import HeadlineDetailScene from './HeadlineDetailScene';

class ReactNativeDemo extends Component {

  render() {
    return (
      <Navigator
        initialRoute={{name: 'HeadlineListScene', object: ''}}
        renderScene={this.renderScene.bind(this)}
      />
    );
  }

  renderScene(route, navigator) {
    switch (route.name) {
      case 'HeadlineListScene':
        return (<HeadlineListScene navigator={navigator}
          object={route.object}/>);
      case 'HeadlineDetailScene':
        return (<HeadlineDetailScene navigator={navigator}
          object={route.object}/>);
    }
  }

}

AppRegistry.registerComponent('ReactNativeDemo', () => ReactNativeDemo);
