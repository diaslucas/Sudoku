import { GET_SUDOKUS, SET_CURRENT_SUDOKU, SET_BOARD_STATE, RESET_CURRENT_SUDOKU, SET_BOARD_STATE_TO_INITIAL_BOARD,
ADD_ERROR, RESET_ERRORS, DELETE_SUDOKU } from '../actions/types';

const initialState = {
  boardRows: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  boards: [],
  currentSudoku: null,
  boardState: [],
  errors: 0
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
          if (index === action.payload.fieldIndex) {
            return action.payload.fieldValue;
          }
          return field;
        })
      };

    case RESET_CURRENT_SUDOKU:
      return {
        ...state, currentSudoku: null
      };

    case ADD_ERROR:
      return {
        ...state, errors: state.errors + 1
      }

    case RESET_ERRORS:
      return {
        ...state, errors: 0
      }

      case DELETE_SUDOKU:
      return {
        ...state,
        boards: state.boards.filter(sudoku => sudoku._id !== action.payload)
      };

    default:
      return state;
  }

}