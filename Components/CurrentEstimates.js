import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default class CurrentEstimates extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentEstimates, currentDelays } = this.props;
    console.log(currentEstimates);
    return (
      <View style={{ flex: 1, paddingTop: 25, paddingRight: 25, paddingLeft: 25, paddingBottom: 50, backgroundColor: '#f7f7f7' }}>
        <Text style={styles.text}>Current Estimates:</Text>
        <ScrollView>
          {
            currentEstimates.length > 0
              ? currentEstimates.map((est, i) => {
                  if (parseInt(est) === 0) {
                    return (
                      <View style={styles.card} key={i}>
                        <Text style={styles.item}>On Platform</Text>
                        <Text style={currentDelays[i] < 1 ? styles.itemOnSchedule : styles.itemDelay}>{currentDelays[i] < 1 ? 'On schedule' : `${currentDelays[i]} min delay`}</Text>
                      </View>
                    );
                  }
                  if (i > 2) return;
                  return (
                    <View style={styles.card} key={i}>
                      <Text style={styles.item}>{est} min</Text>
                      <Text style={currentDelays[i] < 1 ? styles.itemOnSchedule : styles.itemDelay}>{currentDelays[i] < 1 ? 'On schedule' : `${currentDelays[i]} min delay`}</Text>
                    </View>
                  );
                })
              : <Text style={{ color: 'grey', fontSize: 24 }}>No incoming trains found...</Text>
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    fontSize: 24,
    color: '#3e3e3e',
    backgroundColor: '#fff',
    padding: 5
  },
  itemOnSchedule: {
    fontSize: 24,
    color: '#fff',
    backgroundColor: '#77dd77',
    padding: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#fff',
    overflow: 'hidden',
  },
  itemDelay: {
    fontSize: 24,
    color: '#fff',
    backgroundColor: '#fc7171',
    padding: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#fff',
    overflow: 'hidden',
  },
  text: {
    fontSize: 24,
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
