import React, { Component } from "react";
import Navigation from "./components/Navigation";
import SearchForm from "./components/SearchForm";
import "./App.css";

class App extends Component {
  state = {
    myLocations: "",
    searchResult: ""
  };
  componentDidMount() {
    if (window.localStorage.cities) {
    }
  }
  onSubmit = searchQuery => {
    if (searchQuery) {
      this.fetchCurrentWeather(searchQuery);
    }
  };
  fetchCurrentWeather = location => {
    const APIKey = "ed63ab6e517fbb4dbbf4444d70356ca0";
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKey}`
    )
      .then(res => res.json())
      .then(result => {
        console.log(result);
      });
  };
  fetchWeatherForecast = location => {};
  render() {
    const savedLocations = this.state.myLocations;
    return (
      <div className="indexWrap">
        <header className="indexHeader">
          <Navigation />
        </header>
        <div className="indexBody">
          {!savedLocations && <h1>Add a City!</h1>}
          <SearchForm handleSubmit={this.onSubmit} />
          <h2>{this.state.searchResult}</h2>
        </div>
      </div>
    );
  }
}

export default App;
