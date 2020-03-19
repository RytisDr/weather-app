import React, { Component } from "react";
import { BrowserRouter as Route, Link } from "react-router-dom";
import LocationPage from "../pages/Location";
import "../App.css";
export default class MyLocations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      loading: true
    };
    this._isMounted = false; // to fix possible memory leak
  }

  componentDidMount() {
    if (window.localStorage.getItem("myLocations")) {
      const cities = window.localStorage.getItem("myLocations");
      const citiesJSON = JSON.parse(cities);
      const IDArray = [];
      citiesJSON.forEach(city => {
        IDArray.push(city.id);
      });
      this.fetchCities(IDArray);
    }
  }
  componentWillUnmount() {
    this._isMounted = false; // to fix possible memory leak
  }
  fetchCities = IDgroup => {
    const APIKey = process.env.REACT_APP_WEATHER_API_KEY;
    fetch(
      `https://api.openweathermap.org/data/2.5/group?id=${IDgroup}&appid=${APIKey}&units=metric` //the limit is 20 locations at a time
    )
      .then(res => res.json())
      .then(result => {
        this.setState({ cities: result.list });
      });
  };
  removeLocation = id => {
    //REMOVE FROM LOCAL STORAGE
    const storageCities = window.localStorage.getItem("myLocations");
    const storageCitiesJSON = JSON.parse(storageCities);
    const lStorageIndex = storageCitiesJSON.findIndex(city => city.id === id);
    storageCitiesJSON.splice(lStorageIndex, 1);
    window.localStorage.setItem(
      "myLocations",
      JSON.stringify(storageCitiesJSON)
    );
    //REMOVE FROM STATE
    const cities = this.state.cities;
    const stateIndex = cities.findIndex(city => city.id === id);
    cities.splice(stateIndex, 1);
    this.setState({ cities: cities });
  };
  render() {
    const { cities, loading } = this.state;
    return (
      <div>
        {!cities.length && !loading && <h1>Add a Location from Home.</h1>}
        {cities.map(city => {
          return (
            <div key={city.id} className="cityCont">
              <Link key={city.id} className="cityLink" to={`/city/${city.id}`}>
                <h1>{city.name + ", " + city.sys.country} Currently:</h1>
                <h2>{city.weather[0].description}</h2>
                <h2>{Math.round(city.main.temp)} °C</h2>
                <h2>Feels Like: {Math.round(city.main.feels_like)} °C</h2>
                <h2>Wind: {city.wind.speed} km/h</h2>
              </Link>
              <button onClick={() => this.removeLocation(city.id)}>
                Remove
              </button>
            </div>
          );
        })}
        <Route path={`/city/:id`} component={LocationPage} />
      </div>
    );
  }
}
