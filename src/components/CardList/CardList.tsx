import type { JSX } from 'react';

import type { Character } from '../../types/character';
import { getErrorMessage } from '../../utils/errorUtils';
import Card from '../Card/Card';
import Spinner from '../Spinner/Spinner';

import styles from './CardList.module.css';

interface CardListProps {
  characters: Character[];
  isLoading: boolean;
  error: string | null;
  onCardClick: (id: number) => void;
}

const CardList = ({
  characters,
  isLoading,
  error,
  onCardClick,
}: CardListProps): JSX.Element => {
  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return (
      <div className={styles.error_message}>
        <p>⚠️ Oops! Something went wrong.</p>
        <p>{getErrorMessage(error)}</p>
      </div>
    );
  }
  if (!characters.length) {
    return <p>No characters found</p>;
  }
  return (
    <div className={styles.card_list}>
      {characters.map((character) => (
        <Card
          key={character.id}
          character={character}
          onClick={() => onCardClick(character.id)}
        />
      ))}
    </div>
  );
};

export default CardList;
