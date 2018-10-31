import { GET_SUDOKUS } from './types';
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