import type { JSX } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { Character } from '../../types/character';
import type { RootState } from '../../store/store';
import { toggleCharacter } from '../../store/selectedSlice';

import styles from './Card.module.css';

interface CardProps {
  character: Character;
  onClick: () => void;
}

const Card = ({ character, onClick }: CardProps): JSX.Element => {
  const dispatch = useDispatch();
  const isSelected = useSelector((state: RootState) =>
    state.selected.items.some((c) => c.id === character.id)
  );

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.stopPropagation();
    dispatch(toggleCharacter(character));
  };
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
