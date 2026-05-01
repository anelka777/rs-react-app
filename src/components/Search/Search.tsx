import React from 'react';
import './Search.css';

class Search extends React.Component {
  render() {
    return (
      <div>
        <input
          type="text"
          className="search__input"
          placeholder="Search pokemon... "
        />
        <button className="search__button">Search</button>
      </div>
    );
  }
}

export default Search;
