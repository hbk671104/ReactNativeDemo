/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, Navigator, StatusBar, View } from 'react-native';
import HeadlineListScene from './HeadlineListScene';
import HeadlineDetailScene from './HeadlineDetailScene';

class ReactNativeDemo extends Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar
          hidden={true}
        />
        <Navigator
          initialRoute={{name: 'HeadlineListScene', object: ''}}
          renderScene={this.renderScene.bind(this)}
        />
      </View>
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
