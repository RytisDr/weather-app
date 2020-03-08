import React, { Component } from "react";

export default class City extends Component {
  state = {};
  render() {
    //console.log(this.props.city);
    const { id, name, sys, main, weather, wind } = this.props.city;
    const city = { name: name, country: sys.country, id: id };
    return (
      <div className="cityCont">
        <h1>{city.name + ", " + city.country} Currently:</h1>
        <h2>{weather[0].description}</h2>
        <h2>{Math.round(main.temp)} C</h2>
        <h2>Feels Like: {Math.round(main.feels_like)} C</h2>
        <h2>Wind: {wind.speed} km/h</h2>
        <button onClick={() => this.props.saveLocation(city)} id="addCityBtn">
          Save to my Locations
        </button>
      </div>
    );
  }
}
