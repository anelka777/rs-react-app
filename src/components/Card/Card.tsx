import React from 'react';

import type { Pokemon } from '../../types/pokemon';

import styles from './Card.module.css';

interface CardProps {
  pokemon: Pokemon;
}

class Card extends React.Component<CardProps> {
  render(): React.ReactElement {
    const { pokemon } = this.props;

    return (
      <div className={styles.card}>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <h3>{pokemon.name}</h3>
        <p>
          <span className={styles.card__label}>Type:</span>{' '}
          {pokemon.types.map((t) => t.type.name).join(', ')}
        </p>
        <p>
          <span className={styles.card__label}>Height:</span>{' '}
          {pokemon.height / 10}m |{' '}
          <span className={styles.card__label}>Weight:</span>{' '}
          {pokemon.weight / 10}kg
        </p>
        {pokemon.description && <p>{pokemon.description}</p>}
      </div>
    );
  }
}

export default Card;
