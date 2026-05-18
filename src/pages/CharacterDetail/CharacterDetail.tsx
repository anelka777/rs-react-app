import type React from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { fetchCharacterById } from '../../api/character';
import Spinner from '../../components/Spinner/Spinner';
import type { CharacterDetail as CharacterDetailType } from '../../types/character';

const CharacterDetail = (): React.ReactElement => {
  const [character, setCharacter] = useState<CharacterDetailType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  const id = Number(searchParams.get('details'));

  useEffect(() => {
    if (!id) {
      return;
    }

    const load = async (): Promise<void> => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchCharacterById(id);
        setCharacter(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [id]);

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
    <div>
      <img src={character.image} alt={character.name} />
      <h2>{character.name}</h2>
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
      <p>Location: {character.location.name}</p>
      <p>Episodes: {character.episode.length}</p>
    </div>
  );
};

export default CharacterDetail;
