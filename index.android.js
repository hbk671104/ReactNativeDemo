/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  ListView,
  View,
  Text,
  StyleSheet,
  Image,
  Navigator,
  TouchableHighlight} from 'react-native';

class ReactNativeDemo extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
    this.state = {
      dataSource: ds.cloneWithRows([''])
    };
  }

  componentWillMount() {
    this.getHeaderline();
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.customizedRenderRow.bind(this)}
        />
      </View>
    );
  }

  customizedRenderRow(rowData) {
    return (
      <TouchableHighlight onPress={() => this.showHeadlineDetail(rowData)}>
        <View style={styles.container}>
          <Image style={styles.image} source={{uri: rowData.preview}}>
            <View style={styles.alphaContainer}>
              <Text style={styles.text}>{rowData.title}</Text>
            </View>
          </Image>
        </View>
      </TouchableHighlight>
    );
  }

  getHeaderline() {
    fetch('http://web.meishuquan.net/rest/headline/get-headline-list?category=161&limit=20&headline_id=0')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseJson.data)
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  showHeadlineDetail(rowData) {
    console.log(rowData.title)
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  alphaContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  text: {
    textAlign: 'auto',
    fontSize: 20,
    color: 'white',
    marginHorizontal: 10,
    marginVertical: 5
  },
  image: {
    justifyContent: 'flex-end',
    height: 250
  }
});

AppRegistry.registerComponent('ReactNativeDemo', () => ReactNativeDemo);
