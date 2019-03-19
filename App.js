import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Picker,
  ScrollView,
} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availableStops: [],
      currentEstimates: [],
      selectedRoute: 'L - Inbound',
      selectedStop: '',
    }

    this.handleRoutePick = this.handleRoutePick.bind(this);
    this.handleStopPick = this.handleStopPick.bind(this);
  }

  componentDidMount() {
    this._getAvailableStopsFromRoute();
  }

  async _getAvailableStopsFromRoute() {
    const { selectedRoute } = this.state;
    const routeDetails = selectedRoute.split('-');
    const route = routeDetails[0].trim();
    const direction = routeDetails[1].trim().toLowerCase();
    const url = `http://ec2-3-18-105-71.us-east-2.compute.amazonaws.com/v1/api/stations/${route}/${direction}`;
    console.log(url);
    try {
      const results = await fetch(url);
      const availableStops = await results.json();
      this.setState({ availableStops}, () => {
        this.handleStopPick(availableStops[0].tag);
      });
    } catch(e) {
      console.error(e);
    }
  }

  async _getPredictionsFromSelection() {
    const { selectedRoute, selectedStop } = this.state;
    const route = selectedRoute.split('-')[0].trim();
    const url = `http://ec2-3-18-105-71.us-east-2.compute.amazonaws.com/v1/api/predictions/${route}/${selectedStop}`;
    try {
      const results = await fetch(url);
      let currentEstimates = await results.json();
      if (!Array.isArray(currentEstimates)) currentEstimates = [];
      console.log(url);
      this.setState({ currentEstimates });
    } catch(e) {
      console.log(e);
    }
  }

  handleRoutePick(selectedRoute) {
    this.setState({ selectedRoute, selectedStop: '' }, () => {
      this._getAvailableStopsFromRoute();
    });
  }

  handleStopPick(selectedStop) {
    console.log(selectedStop);
    this.setState({ selectedStop }, this._getPredictionsFromSelection);
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "stretch" }}>
        <View style={{ height: 100, backgroundColor: "#333", justifyContent: 'flex-end', alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontSize: 30 }}>GhostTrain</Text>
          <Text style={{ color: '#fff' }}>San Francisco</Text>
        </View>
        <View style={{ flex: 1, paddingTop: 25, paddingRight: 25, paddingLeft: 25, backgroundColor: '#f7f7f7' }}>
          <Text>Select a route:</Text>
          <Picker
            style={{ borderRadius: 15, backgroundColor: '#fff' }}
            selectedValue={this.state.selectedRoute}
            onValueChange={(value) => this.handleRoutePick(value)}
          >
            <Picker.Item label="L - Inbound" value="L - Inbound" />
            <Picker.Item label="L - Outbound" value="L - Outbound" />
            <Picker.Item label="KT - Inbound" value="KT - Inbound" />
            <Picker.Item label="KT - Outbound" value="KT - Outbound" />
            <Picker.Item label="M - Inbound" value="M - Inbound" />
            <Picker.Item label="M - Outbound" value="M - Outbound" />
            <Picker.Item label="N - Inbound" value="N - Inbound" />
            <Picker.Item label="N - Outbound" value="N - Outbound" />
            <Picker.Item label="J - Inbound" value="J - Inbound" />
            <Picker.Item label="J - Outbound" value="J - Outbound" />
          </Picker>
        </View>
        <View style={{ flex: 1, paddingTop: 25, paddingRight: 25, paddingLeft: 25, backgroundColor: '#f7f7f7' }}>
          <Text>Select a stop:</Text>
          <Picker
            style={{ borderRadius: 15, backgroundColor: '#fff' }}
            selectedValue={this.state.selectedStop}
            onValueChange={(value) => this.handleStopPick(value)}
          >
            {
              this.state.availableStops.map((stop, i) => {
                return <Picker.Item label={stop.title} value={stop.tag} key={i} />
              })
            }
          </Picker>
        </View>
        <View style={{ flex: 1, paddingTop: 25, paddingRight: 25, paddingLeft: 25, paddingBottom: 50, backgroundColor: '#f7f7f7' }}>
          <Text>Current Estimates:</Text>
          <ScrollView>
            {
              this.state.currentEstimates.length > 0
                ? this.state.currentEstimates.map((est, i) => {
                    if (parseInt(est) === 0) return;
                    return (<Text style={styles.item} key={i}>{est} min</Text>);
                  })
                : <Text style={styles.item}>Error loading estimates</Text>
            }
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 22,
    height: 44,
    color: '#909090',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f7f7f7' 
  },
});
