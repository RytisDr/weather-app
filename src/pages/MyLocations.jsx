import React, { Component } from "react";

export default class MyLocations extends Component {
  state = {
    keys: [],
    cities: []
  };
  componentDidMount() {
    let keys = Object.keys(localStorage);
    let citiesArr = [];
    if (keys) {
      for (let key of keys) {
        //replace with forEach
        const parseKey = parseInt(key);
        if (Number.isInteger(parseKey)) {
          //this.fetchCities(key);
          //console.log(key);
        }
      }
      //this.setState({ cities: cityIdArr });
    }
  }
  fetchCities = id => {
    const APIKey = process.env.REACT_APP_WEATHER_API_KEY;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${APIKey}&units=metric`
    )
      .then(res => res.json())
      .then(city => {
        let joined = this.state.cities.concat(city);
        this.setState({ cities: joined });
      });
  };

  render() {
    const cities = this.state.cities;
    console.log(cities);
    return (
      <div className="myLocationsWrap">
        {/* cities.map(city => console.log(city)) */}
      </div>
    );
  }
}
