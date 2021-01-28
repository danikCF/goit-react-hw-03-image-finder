import React, { Component } from 'react'

export default class Searchbar extends Component {
  state = {
    query: '',
  }
  handleSubmit = (e) => {
    e.preventDefault();

    const { query } = this.state;
    this.props.onSubmit({ query });
  };
  handleInput = (e) => {
    this.setState({ query: e.target.value });
  }
  render() {
    const { query } = this.state;
    return (
      <div>
        <header className="Searchbar">
          <form className="SearchForm" onSubmit={this.handleSubmit}>
            <button type="submit" className="SearchForm-button">
              <span className="SearchForm-button-label">Search</span>
            </button>

            <input
              className="SearchForm-input"
              type="text"
              placeholder="Search images and photos"
              value={query}
              onChange={this.handleInput}
            />
          </form>
        </header>
      </div>
    )
  }
}
