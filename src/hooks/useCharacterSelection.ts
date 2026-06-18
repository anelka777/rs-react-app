import { useAppDispatch, useAppSelector } from '../store/store';
import { toggleCharacter } from '../store/selectedSlice';
import type { Character } from '../types/character';

interface UseCharacterSelectionReturn {
  isSelected: boolean;
  handleCheckbox: () => void;
}

const useCharacterSelection = (
  character: Character
): UseCharacterSelectionReturn => {
  const dispatch = useAppDispatch();
  const isSelected = useAppSelector((state) =>
    state.selectedCharacters.items.some((c) => c.id === character.id)
  );

  const handleCheckbox = (): void => {
    dispatch(toggleCharacter(character));
  };

  return { isSelected, handleCheckbox };
};

export default useCharacterSelection;
