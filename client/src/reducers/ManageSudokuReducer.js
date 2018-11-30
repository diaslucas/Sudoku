import { SET_MANAGE_SUDOKU,
  SET_MANAGE_SUDOKU_INITIAL_BOARD_STATE, SET_MANAGE_SUDOKU_FINAL_BOARD_STATE, 
  RESET_MANAGE_SUDOKU_BOARDS_STATES } from '../actions/types';

const initialBoardState = new Array(81);
initialBoardState.fill(0, 0, 81);

const initialState = {
  initialBoard: initialBoardState,
  finalBoard: initialBoardState,
  level: ''
}

export default function (state = initialState, action) {
  switch (action.type) {

    case SET_MANAGE_SUDOKU:
    return {
      ...state,
      initialBoard: action.payload.initialBoard,
      finalBoard: action.payload.finalBoard,
      level: action.payload.level,
    }

    case SET_MANAGE_SUDOKU_INITIAL_BOARD_STATE:
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
        initialBoard: initialBoardState,
        finalBoard: initialBoardState,
        level: ''
      }

    default:
      return state;
  }

}