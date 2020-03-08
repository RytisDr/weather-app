import React, { Component } from "react";

export default class City extends Component {
  state = {};
  render() {
    console.log(this.props.city);
    const { name, main, weather } = this.props.city;
    return (
      <div className="cityCont">
        <h1>{name} Currently:</h1>
        <h2>{weather[0].main}</h2>
        <h2>{Math.round(main.temp)} C</h2>
        <h2>Feels Like: {Math.round(main.feels_like)} C</h2>
      </div>
    );
  }
}
