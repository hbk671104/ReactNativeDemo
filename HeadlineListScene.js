import React, { Component } from 'react';
import {
  ListView,
  RefreshControl,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight} from 'react-native';
import QueryString from 'query-string';

export default class HeadlineListScene extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
    this.state = {
      dataSource: ds.cloneWithRows(['']),
      headlineList: [],
      refreshing: false,
      queryParams: {
        category: 161,
        limit: 20,
        headline_id: 0
      }
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
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                const params = this.state.queryParams;
                params.headline_id = 0;
                this.setState({
                  refreshing: true,
                  queryParams: params,
                  headlineList: []
                });
                this.getHeaderline();
              }}
            />
          }
          onEndReached={() => {
            // Get last row data
            const dataSource = this.state.dataSource;
            const lastRowIndex = dataSource.getRowCount() - 1;
            const lastSectionIndex = dataSource.getRowAndSectionCount() - dataSource.getRowCount() - 1;
            const lastRowData = dataSource.getRowData(lastSectionIndex, lastRowIndex);

            // Set headline id
            const params = this.state.queryParams;
            params.headline_id = lastRowData.id;
            this.setState({
              queryParams: params
            });
            this.getHeaderline();
          }}
          onEndReachedThreshold={50}
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
    fetch('http://web.meishuquan.net/rest/headline/get-headline-list?'
    + QueryString.stringify(this.state.queryParams))
      .then((response) => response.json())
      .then((responseJson) => {
        const headlineList = this.state.headlineList.concat(responseJson.data);
        this.setState({
          headlineList: headlineList,
          dataSource: this.state.dataSource.cloneWithRows(headlineList),
          refreshing: false
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  showHeadlineDetail(rowData) {
    this.props.navigator.push({
      name: 'HeadlineDetailScene',
      object: rowData
    });
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
