import { combineReducers } from 'redux';
import userReducer from './UserReducer';
import sudokuReducer from './SudokuReducer';

export default combineReducers({
  user: userReducer,
  sudoku: sudokuReducer
});