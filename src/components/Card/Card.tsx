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
        <p>
          <span className="card__label">Type:</span>{' '}
          {pokemon.types.map((t) => t.type.name).join(', ')}
        </p>
        <p>
          <span className="card__label">Height:</span> {pokemon.height / 10}m |{' '}
          <span className="card__label">Weight:</span> {pokemon.weight / 10}kg
        </p>
        {pokemon.description && <p>{pokemon.description}</p>}
      </div>
    );
  }
}

export default Card;
