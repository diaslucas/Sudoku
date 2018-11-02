import { GET_SUDOKUS, SET_CURRENT_SUDOKU } from './types';
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
  })
}