import {
  SET_MANAGE_SUDOKU_INITIAL_BOARD_STATE, SET_MANAGE_SUDOKU_FINAL_BOARD_STATE,
  RESET_MANAGE_SUDOKU_BOARDS_STATES
} from './types';

export const setInitialBoardState = (fieldIndex, fieldValue) => dispatch => {
  dispatch({
    type: SET_MANAGE_SUDOKU_INITIAL_BOARD_STATE,
    payload: { fieldIndex, fieldValue }
  });
}

export const setFinalBoardState = (fieldIndex, fieldValue) => dispatch => {
  dispatch({
    type: SET_MANAGE_SUDOKU_FINAL_BOARD_STATE,
    payload: { fieldIndex, fieldValue }
  });
}

export const resetBoardsStates = () => dispatch => {
  dispatch({
    type: RESET_MANAGE_SUDOKU_BOARDS_STATES
  });
}