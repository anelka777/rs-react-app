import type { JSX } from 'react';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

import type { CharacterDetail } from '../../types/character';

import styles from './CharacterDetail.module.css';

interface CharacterDetailServerProps {
  id: string;
}

const CharacterDetailServer = async ({
  id,
}: CharacterDetailServerProps): Promise<JSX.Element> => {
  const t = await getTranslations('detail');

  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  const character: CharacterDetail = await res.json();

  if (!res.ok) {
    return <div>{t('error')}</div>;
  }

  if (!character) {
    return <div>{t('noCharacter')}</div>;
  }

  return (
    <div className={styles.detail}>
      <Image
        src={character.image}
        alt={character.name}
        width={150}
        height={150}
        className={styles.image}
      />
      <h2 className={styles.name}>{character.name}</h2>
      <p className={styles.info}>
        <span className={styles.label}>{t('status')}:</span> {character.status}
      </p>
      <p className={styles.info}>
        <span className={styles.label}>{t('species')}:</span>{' '}
        {character.species}
      </p>
      <p className={styles.info}>
        <span className={styles.label}>{t('gender')}:</span> {character.gender}
      </p>
      <p className={styles.info}>
        <span className={styles.label}>{t('location')}:</span>{' '}
        {character.location.name}
      </p>
      <p className={styles.info}>
        <span className={styles.label}>{t('episodes')}:</span>{' '}
        {character.episode.length}
      </p>
    </div>
  );
};

export default CharacterDetailServer;
