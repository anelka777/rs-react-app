'use client';

import type { JSX } from 'react';

import type { Character } from '../../types/character';
import useCharacterSelection from '../../hooks/useCharacterSelection';

import styles from './Card.module.css';

interface CardProps {
  character: Character;
  onClick: () => void;
}

const Card = ({ character, onClick }: CardProps): JSX.Element => {
  const { isSelected, handleCheckbox } = useCharacterSelection(character);

  return (
    <div
      className={`${styles.card} ${isSelected ? styles.card__selected : ''}`}
      onClick={onClick}
    >
      <input
        type="checkbox"
        className={styles.card__checkbox}
        checked={isSelected}
        onChange={handleCheckbox}
        onClick={(e) => e.stopPropagation()}
      />

      <img src={character.image} alt={character.name} />
      <h3>{character.name}</h3>
      <p>
        <span className={styles.card__label}>Species:</span> {character.species}
      </p>
    </div>
  );
};

export default Card;
