import React, { Component } from "react";
import Navigation from "./components/Navigation";
import SearchForm from "./components/SearchForm";
import City from "./components/City";
import "./App.css";

class App extends Component {
  state = {
    myLocations: "",
    searchError: "",
    searchResult: ""
  };
  componentDidMount() {
    if (window.localStorage.cities) {
    }
  }
  onSubmit = searchQuery => {
    if (searchQuery) {
      this.fetchCurrentWeather(searchQuery);
    } else {
    }
  };
  fetchCurrentWeather = location => {
    const APIKey = "ed63ab6e517fbb4dbbf4444d70356ca0";
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKey}&units=metric`
    )
      .then(res => res.json())
      .then(result => {
        if (result.cod === "404") {
          this.setState({
            searchError: "City not found, check the input and try again."
          });
        } else {
          this.setState({
            searchResult: result,
            searchError: ""
          });
        }
      });
  };
  fetchWeatherForecast = location => {};
  render() {
    const { savedLocations, searchError, searchResult } = this.state;
    return (
      <div className="indexWrap">
        <header className="indexHeader">
          <Navigation />
        </header>
        <div className="indexBody">
          {!savedLocations && <h1>Search for a City!</h1>}
          <SearchForm handleSubmit={this.onSubmit} />
          {searchError && <h2>{searchError}</h2>}
          {searchResult && <City city={searchResult} />}
        </div>
      </div>
    );
  }
}

export default App;
