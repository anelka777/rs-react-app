import React from 'react';

import Search from './components/Search/Search';
import CardList from './components/CardList/CardList';
import fetchPokemons from './api/pokemon';
import type { Pokemon } from './types/pokemon';
import './App.css';

interface AppState {
  pokemons: Pokemon[];
  isLoading: boolean;
  error: string | null;
  shouldThrow: boolean;
}

class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      pokemons: [],
      isLoading: true,
      error: null,
      shouldThrow: false,
    };
  }

  componentDidMount(): void {
    const searchTerm = localStorage.getItem('searchTerm') || '';
    this.loadPokemons(searchTerm);
  }

  loadPokemons = async (searchTerm: string): Promise<void> => {
    this.setState({ isLoading: true, error: null });
    try {
      const pokemons = await fetchPokemons(searchTerm);
      this.setState({ pokemons, isLoading: false });
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
    const { pokemons, isLoading, error } = this.state;
    return (
      <div className="app">
        <h1 className="app__title">Pokémon Search App</h1>
        <section className="search-section">
          <Search onSearch={this.loadPokemons} />
        </section>
        <section className="results-section">
          <CardList pokemons={pokemons} isLoading={isLoading} error={error} />
        </section>
        <button className="error-button" onClick={this.throwError}>
          Simulate Error
        </button>
      </div>
    );
  }
}

export default App;
