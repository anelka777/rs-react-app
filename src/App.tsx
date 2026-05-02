import React from 'react';
import Search from './components/Search/Search';
import CardList from './components/CardList/CardList';
import { fetchPokemons } from './api/pokemon';
import type { Pokemon } from './types/pokemon';
import './App.css';

interface AppState {
  pokemons: Pokemon[];
  isLoading: boolean;
  error: string | null;
}

class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      pokemons: [],
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    const searchTerm = localStorage.getItem('searchTerm') || '';
    this.loadPokemons(searchTerm);
  }

  loadPokemons = async (searchTerm: string) => {
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

  render() {
    const { pokemons, isLoading, error } = this.state;
    return (
      <div className="App">
        <h1 className="app__title">Pokémon Search App</h1>
        <section className="search-section">
          <Search onSearch={this.loadPokemons} />
        </section>
        <section className="results-section">
          <CardList pokemons={pokemons} isLoading={isLoading} error={error} />
        </section>
      </div>
    );
  }
}

export default App;
