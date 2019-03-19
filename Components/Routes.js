import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Picker
} from 'react-native';

export default class Routes extends Component {
  constructor(props) {
    super(props);
    this.routes = [
      'L - Inbound',
      'L - Outbound',
      'KT - Inbound',
      'KT - Outbound',
      'M - Inbound',
      'M - Outbound',
      'N - Inbound',
      'N - Outbound',
      'J - Inbound',
      'J - Outbound',
    ];
  }

  render() {
    const { selectedRoute, handleRoutePick } = this.props;
    return (
      <View style={{ flex: 1, paddingTop: 25, paddingRight: 25, paddingLeft: 25, backgroundColor: '#f7f7f7' }}>
        <Text style={styles.text}>Select a route:</Text>
        <Picker
          style={{ borderRadius: 15, backgroundColor: '#fff' }}
          selectedValue={selectedRoute}
          onValueChange={(value) => handleRoutePick(value)}
        >
          {
            this.routes.map((route, i) => {
              return (
                <Picker.Item label={route} value={route} key={i} />
              );
            })
          }
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    paddingBottom: 10
  },
});
