import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AddLocation from "./pages/AddLocation";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <Link to="/">Home</Link>
            <Link to="/Add-Location">Add Location</Link>
          </nav>
          <Switch>
            <Route exact path="/">
              <h1>INDEX</h1>
            </Route>
            <Route
              path="/Add-Location"
              component={props => <AddLocation {...props} />}
            />
          </Switch>
        </header>
      </div>
    </Router>
  );
}

export default App;
