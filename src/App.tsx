import React from 'react';

import Search from './components/Search/Search';
import CardList from './components/CardList/CardList';
import fetchCharacters from './api/character';
import type { Character } from './types/character';
import styles from './App.module.css';

interface AppState {
  characters: Character[];
  isLoading: boolean;
  error: string | null;
  shouldThrow: boolean;
}

class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      characters: [],
      isLoading: true,
      error: null,
      shouldThrow: false,
    };
  }

  componentDidMount(): void {
    const searchTerm = localStorage.getItem('searchTerm') || '';
    this.loadCharacters(searchTerm);
  }

  loadCharacters = async (searchTerm: string): Promise<void> => {
    this.setState({ isLoading: true, error: null });
    try {
      const characters = await fetchCharacters(searchTerm);
      this.setState({ characters, isLoading: false });
    } catch (error) {
      this.setState({
        error: error instanceof Error ? error.message : 'Something went wrong',
        isLoading: false,
      });
    }
  };

  throwError = (): void => {
    this.setState({ shouldThrow: true });
  };

  render(): React.ReactElement {
    if (this.state.shouldThrow) {
      throw new Error('Test error!');
    }
    const { characters, isLoading, error } = this.state;
    return (
      <div className={styles.app}>
        <h1 className={styles.app__title}>Rick and Morty Characters</h1>
        <section className={styles.search_section}>
          <Search onSearch={this.loadCharacters} />
        </section>
        <section className={styles.results_section}>
          <CardList
            characters={characters}
            isLoading={isLoading}
            error={error}
          />
        </section>
        <button className={styles.error_button} onClick={this.throwError}>
          Simulate Error
        </button>
      </div>
    );
  }
}

export default App;
