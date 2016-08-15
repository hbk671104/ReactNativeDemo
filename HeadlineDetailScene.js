import React, { Component } from 'react';
import {
  View,
  WebView
} from 'react-native';

export default class HeadlineDetailScene extends Component {

  render() {
    return (
      <WebView
        source={{uri: this.props.passInObject.share_link}}
        userAgent='MeishuquanMessenger'
      />
    );
  }

}
