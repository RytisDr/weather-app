import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MyLocations from "../pages/MyLocations";

export default class Navigation extends Component {
  render() {
    return (
      <Router>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/My-Locations">My Locations</Link>
        </nav>
        <Switch>
          <Route exact path="/">
            <h1>INDEX</h1>
          </Route>
          <Route
            path="/My-Locations"
            component={props => <MyLocations {...props} />}
          />
        </Switch>
      </Router>
    );
  }
}
