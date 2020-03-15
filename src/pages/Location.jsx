import React, { Component } from "react";

export default class Location extends Component {
  state = {
    forecast: "",
    error: ""
  };
  componentDidMount() {
    let { id } = this.props.match.params;
    if (id) {
      this.fetchCityForecast(id);
    }
  }
  fetchCityForecast = id => {
    const APIKey = process.env.REACT_APP_WEATHER_API_KEY;
    const endpoint = `https://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=${APIKey}&units=metric`;
    fetch(endpoint)
      .then(res => res.json())
      .then(result => {
        if (result.cod === "404") {
          this.setState({ error: "City not found" });
        } else {
          this.setState({ forecast: result });
        }
      });
  };
  render() {
    const forecast = this.state.forecast;
    if (this.state.forecast) {
      console.log(forecast);
    }

    return (
      <React.Fragment>
        {forecast && (
          <div>
            <h1>{forecast.city.name}</h1>
            {forecast.list.map(e => (
              <div className="timeTemp" key={e.dt}>
                <h3>{e.dt_txt}</h3>
                <p>{Math.round(e.main.temp)}</p>
              </div>
            ))}
          </div>
        )}
      </React.Fragment>
    );
  }
}
