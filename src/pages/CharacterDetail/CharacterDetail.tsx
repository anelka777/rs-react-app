import type { JSX } from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import { fetchCharacterById } from '../../api/character';
import Spinner from '../../components/Spinner/Spinner';
import type { CharacterDetail as CharacterDetailType } from '../../types/character';

import styles from './CharacterDetail.module.css';

const CharacterDetail = (): JSX.Element => {
  const { detailsId } = useParams();

  const [character, setCharacter] = useState<CharacterDetailType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(!!detailsId);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!detailsId) {
      return;
    }

    const load = async (): Promise<void> => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchCharacterById(detailsId);
        setCharacter(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [detailsId]);

  if (!detailsId) {
    return <></>;
  }

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
