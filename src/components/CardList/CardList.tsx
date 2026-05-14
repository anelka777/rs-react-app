import type { Character } from '../../types/character';
import Card from '../Card/Card';
import Spinner from '../Spinner/Spinner';

import styles from './CardList.module.css';

interface CardListProps {
  characters: Character[];
  isLoading: boolean;
  error: string | null;
}

const CardList = ({
  characters,
  isLoading,
  error,
}: CardListProps): React.ReactElement => {
  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    let errorMessage = error;
    if (error.includes('404')) {
      errorMessage = 'Character not found. Try another name!';
    } else if (error.includes('400')) {
      errorMessage = 'Invalid search. Please use English letters only!';
    } else if (/5\d\d/.test(error)) {
      errorMessage = 'Server error. Please try again later!';
    }
    return (
      <div className={styles.error_message}>
        <p>⚠️ Oops! Something went wrong.</p>
        <p>{errorMessage}</p>
      </div>
    );
  }
  return (
    <div className={styles.card_list}>
      {characters.map((character) => (
        <Card key={character.id} character={character} />
      ))}
    </div>
  );
};

export default CardList;
