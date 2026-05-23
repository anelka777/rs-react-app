import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import { fetchCharacterById } from '../api/character';
import type { CharacterDetail } from '../types/character';

interface UseCharacterDetailResult {
  character: CharacterDetail | null;
  isLoading: boolean;
  error: string | null;
}

const useCharacterDetail = (): UseCharacterDetailResult => {
  const { detailsId } = useParams();

  const [character, setCharacter] = useState<CharacterDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  return { character, isLoading, error };
};

export default useCharacterDetail;
