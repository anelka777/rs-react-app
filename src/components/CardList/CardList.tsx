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
  render() {
    const { pokemons, isLoading, error } = this.props;
    if (isLoading) return <Spinner />;
    if (error) return <div>{error}</div>;
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
