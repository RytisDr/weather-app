import React, { Component } from "react";

export default class MyLocations extends Component {
  state = {
    cities: []
  };
  componentDidMount() {
    let keys = Object.keys(localStorage);
    if (keys) {
      console.log(keys);
      for (let key of keys) {
        const parseKey = parseInt(key);

        if (Number.isInteger(parseKey)) {
          //this.fetchCities(key);
          // console.log(key);
        }
      }
      //this.setState({ cities: cityIdArr });
    }
  }
  fetchCities = id => {
    const APIKey = "ed63ab6e517fbb4dbbf4444d70356ca0";
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
    return (
      <div className="myLocationsWrap">
        {cities.map(city => {
          // console.log(city);
        })}
      </div>
    );
  }
}
