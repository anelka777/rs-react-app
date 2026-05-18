import type { Character } from '../../types/character';

import styles from './Card.module.css';

interface CardProps {
  character: Character;
  onClick: () => void;
}

const Card = ({ character, onClick }: CardProps): React.ReactElement => {
  return (
    <div className={styles.card} onClick={onClick}>
      <img src={character.image} alt={character.name} />
      <h3>{character.name}</h3>
      <p>
        <span className={styles.card__label}>Species:</span> {character.species}
      </p>
    </div>
  );
};

export default Card;
