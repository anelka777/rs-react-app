import React from 'react';
import type { Pokemon } from '../../types/pokemon';

interface CardListProps {
  pokemons: Pokemon[];
  isLoading: boolean;
  error: string | null;
}

class CardList extends React.Component<CardListProps> {
  render() {
    const { pokemons, isLoading, error } = this.props;
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    return (
      <div>
        {pokemons.map((pokemon) => (
          <div key={pokemon.id}>{pokemon.name}</div>
        ))}
      </div>
    );
  }
}

export default CardList;
