import type { JSX } from 'react';

import useCharacterDetail from '../../hooks/useCharacterDetail';
import Spinner from '../../components/Spinner/Spinner';

import styles from './CharacterDetail.module.css';

const CharacterDetail = (): JSX.Element => {
  const { character, isLoading, error } = useCharacterDetail();

  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!character) {
    return <div>No character found</div>;
  }

  return (
    <div className={styles.detail}>
      <img
        src={character.image}
        alt={character.name}
        className={styles.image}
      />
      <h2 className={styles.name}>{character.name}</h2>
      <p className={styles.info}>
        <span className={styles.label}>Status:</span> {character.status}
      </p>
      <p className={styles.info}>
        <span className={styles.label}>Species:</span> {character.species}
      </p>
      <p className={styles.info}>
        <span className={styles.label}>Gender:</span> {character.gender}
      </p>
      <p className={styles.info}>
        <span className={styles.label}>Location:</span>{' '}
        {character.location.name}
      </p>
      <p className={styles.info}>
        <span className={styles.label}>Episodes:</span>{' '}
        {character.episode.length}
      </p>
    </div>
  );
};

export default CharacterDetail;
