import React from 'react';
import './Search.css';

interface SearchProps {
  onSearch: (searchTerm: string) => void;
}

interface SearchState {
  searchTerm: string;
}

class Search extends React.Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('searchTerm') || '',
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = () => {
    const trimmed = this.state.searchTerm.trim();
    localStorage.setItem('searchTerm', trimmed);
    this.setState({ searchTerm: trimmed });
    this.props.onSearch(trimmed);
  };

  render() {
    return (
      <div className="search">
        <input
          type="text"
          className="search__input"
          placeholder="Search pokemon... "
          value={this.state.searchTerm}
          onChange={this.handleInputChange}
        />
        <button className="search__button" onClick={this.handleSearch}>
          Search
        </button>
      </div>
    );
  }
}

export default Search;
