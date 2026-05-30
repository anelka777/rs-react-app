import { useParams } from 'react-router';

import { useGetCharacterByIdQuery } from '../store/characterApi';
import type { CharacterDetail } from '../types/character';

interface UseCharacterDetailResult {
  character: CharacterDetail | null;
  isLoading: boolean;
  error: string | null;
}

const useCharacterDetail = (): UseCharacterDetailResult => {
  const { detailsId } = useParams();

  const { data, isLoading, error } = useGetCharacterByIdQuery(detailsId ?? '', {
    skip: !detailsId,
  });

  return {
    character: data ?? null,
    isLoading,
    error: error ? 'Something went wrong. Please try again.' : null,
  };
};

export default useCharacterDetail;
