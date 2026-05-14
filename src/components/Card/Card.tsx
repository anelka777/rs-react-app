import type { Character } from '../../types/character';

import styles from './Card.module.css';

interface CardProps {
  character: Character;
}

const Card = ({ character }: CardProps): React.ReactElement => {
  return (
    <div className={styles.card}>
      <img src={character.image} alt={character.name} />
      <h3>{character.name}</h3>
      <p>
        <span className={styles.card__label}>Status:</span> {character.status}
      </p>
      <p>
        <span className={styles.card__label}>Species:</span> {character.species}
      </p>
      <p>
        <span className={styles.card__label}>Gender:</span> {character.gender}
      </p>
      <p>
        <span className={styles.card__label}>Location:</span>{' '}
        {character.location.name}
      </p>
    </div>
  );
};

export default Card;
