import { GET_SUDOKUS, SET_CURRENT_SUDOKU, SET_BOARD_STATE, RESET_BOARD_STATE, SET_BOARD_STATE_TO_INITIAL_BOARD } from '../actions/types';

const initialState = {
  boardRows: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  boards: [],
  currentSudoku: null,
  boardState: []
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

    case SET_BOARD_STATE_TO_INITIAL_BOARD:
      return {
        ...state, boardState: action.payload
      }

    case SET_BOARD_STATE:
      return {
        ...state, 
        boardState: state.boardState.map((field, index) => {
          if (index === action.fieldIndex) {
            return action.fieldValue;
          }
          return field;
        })
      };

    case RESET_BOARD_STATE:
      return {
        ...state, boardState: []
      };

    default:
      return state;
  }

}