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
    const url = `ec2-3-18-105-71.us-east-2.compute.amazonaws.com/v1/api/stations/${route}/${direction}`;
    try {
      const results = await fetch(url);
      const availableStops = await results.json();
      this.setState({ availableStops });
    } catch(e) {
      console.error(e);
    }
  }

  handleRoutePick(selectedRoute) {
    this.setState({ selectedRoute, selectedStop: '' }, () => {
      this._getAvailableStopsFromRoute();
    });
  }

  handleStopPick(selectedStop) {
    this.setState({ selectedStop });
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
                return <Picker.Item label={stop.title} value={stop.title} key={i} />
              })
            }
          </Picker>
        </View>
        <View style={{ flex: 1, paddingTop: 25, paddingRight: 25, paddingLeft: 25, backgroundColor: '#f7f7f7' }}>
          {/* <Text>Current Estimates:</Text> */}
          <ScrollView>
        </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: '#909090',
  },
});
