import { GET_SUDOKUS, SET_CURRENT_SUDOKU, SET_BOARD_STATE, RESET_CURRENT_SUDOKU, SET_BOARD_STATE_TO_INITIAL_BOARD,
  ADD_ERROR, RESET_ERRORS , DELETE_SUDOKU } from './types';
import axios from 'axios';

export const getSudokus = () => dispatch => {
  axios
  .get('/api/sudokus')
  .then(res => {
    dispatch({
      type: GET_SUDOKUS,
      payload: res.data
    });
  })
}

export const deleteSudoku = (sudokuID) => dispatch => {
  axios
  .delete(`/api/sudokus/${sudokuID}`)
  .then(res => {
    dispatch({
      type: DELETE_SUDOKU,
      payload: sudokuID
    });
  })
}

export const setCurrentSudoku = sudoku => dispatch => {
  dispatch({
    type: SET_CURRENT_SUDOKU,
    payload: sudoku
  });

  const {initialBoard} = sudoku;
  setBoardStateToInitialBoard(initialBoard, dispatch);
}


const setBoardStateToInitialBoard = (initialBoard, dispatch) => {
  dispatch({
    type: SET_BOARD_STATE_TO_INITIAL_BOARD,
    payload: initialBoard
  });
}

export const setBoardState = (fieldIndex, fieldValue) => dispatch => {
  dispatch({
    type: SET_BOARD_STATE,
    payload: { fieldIndex, fieldValue }
  });
}

export const resetCurrentSudoku = () => dispatch => {
  dispatch({
    type: RESET_CURRENT_SUDOKU
  });
}

export const addError = () => dispatch => {
  dispatch({
    type: ADD_ERROR
  });
}

export const resetErrors = () => dispatch => {
  dispatch({
    type: RESET_ERRORS
  });
}