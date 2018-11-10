import { GET_SUDOKUS, SET_CURRENT_SUDOKU, SET_BOARD_STATE, RESET_BOARD_STATE, SET_BOARD_STATE_TO_INITIAL_BOARD } from './types';
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

export const setCurrentSudoku = sudokuID => dispatch => {
  axios
  .get(`/api/sudokus/${sudokuID}`)
  .then(res => {
    dispatch({
      type: SET_CURRENT_SUDOKU,
      payload: res.data
    });
    const {initialBoard} = res.data;
    setBoardStateToInitialBoard(initialBoard, dispatch);
  })
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

export const resetBoardState = () => dispatch => {
  dispatch({
    type: RESET_BOARD_STATE
  });
}