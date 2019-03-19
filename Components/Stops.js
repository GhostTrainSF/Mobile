import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Picker
} from 'react-native';

export default class Stops extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { selectedStop, availableStops, handleStopPick } = this.props;
    return (
      <View style={{ flex: 1, paddingTop: 25, paddingRight: 25, paddingLeft: 25, backgroundColor: '#f7f7f7' }}>
        <Text style={styles.text}>Select a stop:</Text>
        <Picker
          style={{ borderRadius: 15, backgroundColor: '#fff' }}
          selectedValue={selectedStop}
          onValueChange={(value) => handleStopPick(value)}
        >
          {
            availableStops.map((stop, i) => {
              return <Picker.Item label={stop.title} value={stop.tag} key={i} />
            })
          }
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    fontSize: 24,
    color: '#909090',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    paddingBottom: 10
  },
  card: {
    padding: 10,
    color: '#909090',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f7f7f7',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
