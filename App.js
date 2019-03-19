import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import CurrentEstimates from './Components/CurrentEstimates.js';
import Stops from './Components/Stops.js';
import Routes from './Components/Routes.js';
import Header from './Components/Header.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availableStops: [],
      currentEstimates: [],
      currentDelays: [0, 0, 0],
      selectedRoute: 'L - Inbound',
      selectedStop: '',
    }

    this.handleRoutePick = this.handleRoutePick.bind(this);
    this.handleStopPick = this.handleStopPick.bind(this);
    this._getPredictionsFromSelection = this._getPredictionsFromSelection.bind(this);
  }

  componentDidMount() {
    this._getAvailableStopsFromRoute();
    window.setInterval(this._getPredictionsFromSelection, 60000);
  }

  async _getAvailableStopsFromRoute() {
    const { selectedRoute } = this.state;
    const routeDetails = selectedRoute.split('-');
    const route = routeDetails[0].trim();
    const direction = routeDetails[1].trim().toLowerCase();
    const url = `http://ec2-3-18-105-71.us-east-2.compute.amazonaws.com/v1/api/stations/${route}/${direction}`;
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
    const delaysUrl = `http://ec2-3-18-105-71.us-east-2.compute.amazonaws.com/v1/api/initDelay/${route}/${selectedStop}`;
    try {
      const currEstResults = await fetch(url);
      let currentEstimates = await currEstResults.json();
      const currentDelaysResults = await fetch(delaysUrl);
      let currentDelays = await currentDelaysResults.json();
      if (!Array.isArray(currentEstimates)) currentEstimates = [];
      this.setState({ currentEstimates, currentDelays });
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
    this.setState({ selectedStop }, this._getPredictionsFromSelection);
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "stretch" }}>
        <Header />
        <Routes
          selectedRoute={this.state.selectedRoute}
          handleRoutePick={this.handleRoutePick}
        />
        <Stops
          handleStopPick={this.handleStopPick}
          selectedStop={this.state.selectedStop}
          availableStops={this.state.availableStops}
        />
        <CurrentEstimates
          currentEstimates={this.state.currentEstimates}
          currentDelays={this.state.currentDelays}
        />
      </View>
    );
  }
}
