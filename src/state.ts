export type State = {
  selectedWord: string;
  correctLetters: string[];
  wrongLetters: string[];
  playable: boolean;
};

export function initialState(selectedWord: string): State {
  return {
    selectedWord,
    correctLetters: [],
    wrongLetters: [],
    playable: true,
  };
}
