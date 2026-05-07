import React from 'react';
import styles from './Search.module.css';

interface SearchProps {
  onSearch: (searchTerm: string) => void;
}

interface SearchState {
  searchTerm: string;
  lastSearchTerm: string;
}

class Search extends React.Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('searchTerm') || '',
      lastSearchTerm: localStorage.getItem('searchTerm') || '',
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = (): void => {
    const trimmed: string = this.state.searchTerm.trim();
    if (trimmed === this.state.lastSearchTerm) {
      return;
    }

    localStorage.setItem('searchTerm', trimmed);
    this.setState({ searchTerm: trimmed, lastSearchTerm: trimmed });
    this.props.onSearch(trimmed);
  };

  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  };

  render(): React.ReactElement {
    return (
      <div className={styles.search}>
        <input
          type="text"
          className={styles.search__input}
          placeholder="Search pokemon... "
          value={this.state.searchTerm}
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
        />
        <button className={styles.search__button} onClick={this.handleSearch}>
          Search
        </button>
      </div>
    );
  }
}

export default Search;
