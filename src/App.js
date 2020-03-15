import React, { Component } from "react";
import SearchForm from "./components/SearchForm";
import MyLocations from "./pages/MyLocations";
import LocationPage from "./pages/Location";
import City from "./components/City";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

class App extends Component {
  state = {
    searchError: "",
    queryResult: ""
  };
  componentDidMount() {
    if (window.localStorage.getItem("homeCity")) {
      const homeCityId = window.localStorage.getItem("homeCity");
      this.fetchCurrentWeather(undefined, homeCityId);
    }
  }
  onSubmit = searchQuery => {
    if (searchQuery) {
      this.fetchCurrentWeather(searchQuery, undefined);
    }
  };

  fetchCurrentWeather = (location, id) => {
    let endpoint;
    const APIKey = process.env.REACT_APP_WEATHER_API_KEY;
    //from search input
    if (location) {
      endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKey}&units=metric`;
    }
    //from homeCityId prop
    else if (id) {
      endpoint = `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${APIKey}&units=metric`;
    }
    fetch(endpoint)
      .then(res => res.json())
      .then(result => {
        if (result.cod === "404") {
          this.setState({
            searchError: "City not found, check the input and try again."
          });
        } else {
          this.setState({
            queryResult: result,
            searchError: ""
          });
        }
      });
  };
  render() {
    const { searchError, queryResult } = this.state;
    return (
      <Router>
        <header>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/My-Locations">My Locations</Link>
          </nav>
        </header>
        <Switch>
          <Route exact path="/">
            <div className="indexWrap">
              <div className="indexBody">
                <h1>Search for a City!</h1>
                <SearchForm handleSubmit={this.onSubmit} />
                {searchError && <h2>{searchError}</h2>}
                {queryResult && <City city={queryResult} />}
              </div>
            </div>
          </Route>
          <Route
            path="/My-Locations"
            component={props => <MyLocations {...props} />}
          ></Route>
          <Route path={`/city/:cidyId`} component={LocationPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
