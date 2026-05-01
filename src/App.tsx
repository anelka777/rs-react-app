import React from 'react';
import Search from './components/Search/Search';
import CardList from './components/CardList/CardList';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1 className="app__title">Pokémon Search App</h1>
        <section className="search-section">
          <Search />
        </section>
        <section className="results-section">
          <CardList />
        </section>
      </div>
    );
  }
}

export default App;
