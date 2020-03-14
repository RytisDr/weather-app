import React, { Component } from "react";
import {
  WiSnow,
  WiDaySunny,
  WiCloud,
  WiRain,
  WiRainMix,
  WiThunderstorm,
  WiWindy
} from "weather-icons-react";

export default class City extends Component {
  state = {};

  pickIcon = weather => {
    const iconSize = 50;
    const iconColor = "#000";
    if (weather === "Snow") {
      return <WiSnow size={iconSize} color={iconColor} />;
    }
    if (weather === "Clear") {
      return <WiDaySunny size={iconSize} color={iconColor} />;
    }
    if (weather === "Clouds") {
      return <WiCloud size={iconSize} color={iconColor} />;
    }
    if (weather === "Rain") {
      return <WiRain size={iconSize} color={iconColor} />;
    }
    if (weather === "Drizzle") {
      return <WiRainMix size={iconSize} color={iconColor} />;
    }
    if (weather === "Thunderstorm") {
      return <WiThunderstorm size={iconSize} color={iconColor} />;
    } else {
      return <WiWindy size={iconSize} color={iconColor} />;
    }
  };
  saveToMyLocations = location => {
    const storage = window.localStorage;
    let locationsArr = [];
    //if myLocations already exists in Local Storage
    if (storage.getItem("myLocations")) {
      const myLocations = storage.getItem("myLocations");
      locationsArr = JSON.parse(myLocations);
      const match = locationsArr.find(city => city.id === location.id);
      if (!match) {
        locationsArr.push(location);
        storage.setItem("myLocations", JSON.stringify(locationsArr));
      }
    }
    //if myLocations does not exist in Local Storage yet
    else {
      locationsArr.push(location);
      storage.setItem("myLocations", JSON.stringify(locationsArr));
    }
  };
  setHomeCity = id => {
    const storage = window.localStorage;
    storage.setItem("homeCity", id);
    this.setState({ homeCity: id });
  };
  checkIfMyLocation = id => {
    if (window.localStorage.getItem("myLocations")) {
      const myLocationsArr = JSON.parse(
        window.localStorage.getItem("myLocations")
      );
      const match = myLocationsArr.find(city => city.id === id);
      if (match) {
        return true;
      }
    } else {
      return false;
    }
  };
  checkIfHomeCity = id => {
    if (window.localStorage.getItem("homeCity") === id.toString()) {
      return true;
    } else {
      return false;
    }
  };
  hideButton = event => {
    event.target.style.display = "none";
  };
  render() {
    console.log("render");
    const { id, name, sys, main, weather, wind } = this.props.city;
    const city = { name: name, country: sys.country, id: id };
    const icon = this.pickIcon(weather[0].main);
    return (
      <div className="cityCont">
        <h1>{city.name + ", " + city.country} Currently:</h1>
        <h2>{weather[0].description}</h2>
        {icon}
        <h2>{Math.round(main.temp)} C</h2>
        <h2>Feels Like: {Math.round(main.feels_like)} C</h2>
        <h2>Wind: {wind.speed} km/h</h2>

        {!this.checkIfMyLocation(city.id) && (
          <button
            onClick={event => {
              this.saveToMyLocations(city);
              this.hideButton(event);
            }}
            id="setMyLocationBtn"
          >
            Save to my Locations
          </button>
        )}
        {!this.checkIfHomeCity(city.id) && (
          <button
            onClick={() => {
              this.setHomeCity(city.id);
              this.checkIfHomeCity(city.id);
            }}
          >
            Set as Home
          </button>
        )}
      </div>
    );
  }
}
