import React from 'react';

import type { Pokemon } from '../../types/pokemon';
import Card from '../Card/Card';
import Spinner from '../Spinner/Spinner';
import './CardList.css';

interface CardListProps {
  pokemons: Pokemon[];
  isLoading: boolean;
  error: string | null;
}

class CardList extends React.Component<CardListProps> {
  render(): React.ReactElement {
    const { pokemons, isLoading, error } = this.props;
    if (isLoading) {
      return <Spinner />;
    }
    if (error) {
      let errorMessage = error;
      if (error.includes('404')) {
        errorMessage = 'Pokemon not found. Try another name!';
      } else if (error.includes('400')) {
        errorMessage = 'Invalid search. Please use English letters only!';
      } else if (/5\d\d/.test(error)) {
        errorMessage = 'Server error. Please try again later!';
      }
      return (
        <div className="error-message">
          <p>⚠️ Oops! Something went wrong.</p>
          <p>{errorMessage}</p>
        </div>
      );
    }
    return (
      <div className="card-list">
        {pokemons.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    );
  }
}

export default CardList;
