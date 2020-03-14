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
  removeButton = event => {
    event.target.remove();
  };
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
    if (storage.getItem("myLocations")) {
      const myLocations = storage.getItem("myLocations");
      const locationsObj = JSON.parse(myLocations);
    } else {
      storage.setItem("myLocations", JSON.stringify(location));
    }
  };
  setHomeCity = id => {
    const storage = window.localStorage;
    storage.setItem("homeCity", id);
  };
  render() {
    //console.log(this.props.city);
    const { id, name, sys, main, weather, wind } = this.props.city;
    const city = { name: name, country: sys.country, id: id };
    const icon = this.pickIcon(weather[0].main);
    const myLocations = window.localStorage.getItem("myLocations");
    return (
      <div className="cityCont">
        <h1>{city.name + ", " + city.country} Currently:</h1>
        <h2>{weather[0].description}</h2>
        {icon}
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
