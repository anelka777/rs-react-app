import React from 'react';
import type { Pokemon } from '../../types/pokemon';
import './Card.css';

interface CardProps {
  pokemon: Pokemon;
}

class Card extends React.Component<CardProps> {
  render() {
    const { pokemon } = this.props;

    return (
      <div className="card">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <h3>{pokemon.name}</h3>
        <p>{pokemon.types.map((t) => t.type.name).join(', ')}</p>
        <p>
          Height: {pokemon.height / 10}m | Weight: {pokemon.weight / 10}kg
        </p>
        <p>Base XP: {pokemon.base_experience}</p>
      </div>
    );
  }
}

export default Card;
