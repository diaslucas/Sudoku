import { GET_SUDOKUS, SET_CURRENT_SUDOKU } from '../actions/types';

const initialState = {
  boardRows: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  boards: [],
  currentSudoku: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SUDOKUS:
      return {
        ...state, boards: action.payload
      };

      case SET_CURRENT_SUDOKU:
      return {
        ...state, currentSudoku: action.payload
      };

    default:
      return state;
  }

}