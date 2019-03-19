import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

export default class Routes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ height: 100, backgroundColor: "#333", justifyContent: 'flex-end', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 30 }}>GhostTrain</Text>
        <Text style={{ color: '#fff' }}>San Francisco</Text>
      </View>
    );
  }
}
