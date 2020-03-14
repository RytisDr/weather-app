import React, { Component } from "react";

export default class MyLocations extends Component {
  state = {
    cities: []
  };
  componentDidMount() {
    if (window.localStorage.getItem("myLocations")) {
      let cities = window.localStorage.getItem("myLocations");
      let citiesJSON = JSON.parse(cities);
      citiesJSON.forEach(city => {
        this.fetchCities(city.id);
      });
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
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
  removeLocation = id => {
    const cities = this.state.cities;
    const match = cities.find(city => city.id === id);
    //const index = Object.keys(cities).indexOf(match);
    console.log(match);
  };
  render() {
    const cities = this.state.cities;
    console.log(cities);
    const localStorage = window.localStorage;
    return (
      <div className="myLocationsWrap">
        {!localStorage.getItem("myLocations") && (
          <h1>Add a Location from Home.</h1>
        )}
        {cities.map(city => {
          return (
            <div key={city.id}>
              <h1>{city.name + ", " + city.sys.country} Currently:</h1>
              <h2>{city.weather[0].description}</h2>
              <h2>{Math.round(city.main.temp)} C</h2>
              <h2>Feels Like: {Math.round(city.main.feels_like)} C</h2>
              <h2>Wind: {city.wind.speed} km/h</h2>
              <button onClick={() => this.removeLocation(city.id)}>
                Remove
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}
