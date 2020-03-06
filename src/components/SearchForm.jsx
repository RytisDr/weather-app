import React, { Component } from "react";

export default class SearchForm extends Component {
  state = {
    searchQuery: null
  };
  render() {
    return (
      <div className="searchForm">
        <input
          type="text"
          onChange={event => this.setState({ searchQuery: event.target.value })}
        />
        <button onClick={() => this.props.handleSubmit(this.state.searchQuery)}>
          Search
        </button>
      </div>
    );
  }
}
