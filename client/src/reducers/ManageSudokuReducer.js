import { SET_MANAGE_SUDOKU_INITIAL_BOARD_STATE, SET_MANAGE_SUDOKU_FINAL_BOARD_STATE, RESET_MANAGE_SUDOKU_BOARDS_STATES } from '../actions/types';

const initialBoard = new Array(88);
    initialBoard.fill(0, 0, 88);

const initialState = {
  initialBoard: initialBoard,
  finalBoard: initialBoard
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_MANAGE_SUDOKU_INITIAL_BOARD_STATE:
    console.log(action.payload);
      return {
        ...state,
        initialBoard: state.initialBoard.map((field, index) => {
          if (index === action.payload.fieldIndex) {
            return action.payload.fieldValue;
          }
          return field;
        })
      }

    case SET_MANAGE_SUDOKU_FINAL_BOARD_STATE:
      return {
        ...state,
        finalBoard: state.finalBoard.map((field, index) => {
          if (index === action.payload.fieldIndex) {
            return action.payload.fieldValue;
          }
          return field;
        })
      }

    case RESET_MANAGE_SUDOKU_BOARDS_STATES:
      return {
        ...state,
        initialBoard: initialBoard,
        finalBoard: initialBoard
      }

    default:
      return state;
  }

}