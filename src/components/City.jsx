import React, { Component } from "react";

export default class City extends Component {
  state = {};
  removeButton = event => {
    event.target.remove();
  };
  saveToMyLocations = location => {
    const storage = window.localStorage;
    storage.setItem(location.id, JSON.stringify(location));
  };
  setHomeCity = id => {
    const storage = window.localStorage;
    storage.setItem("homeCity", id);
  };
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

        {!window.localStorage[city.id] && (
          <button
            onClick={event => {
              this.saveToMyLocations(city);
              this.removeButton(event);
            }}
            id="addCityBtn"
          >
            Save to my Locations
          </button>
        )}
        {window.localStorage.getItem("homeCity") !== city.id.toString() && (
          <button
            onClick={event => {
              this.setHomeCity(city.id);
              this.removeButton(event);
            }}
          >
            Set as Home
          </button>
        )}
      </div>
    );
  }
}
