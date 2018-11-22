import { combineReducers } from 'redux';
import userReducer from './UserReducer';
import sudokuReducer from './SudokuReducer';
import manageSudokuReducer from './ManageSudokuReducer';

export default combineReducers({
  user: userReducer,
  sudoku: sudokuReducer,
  manageSudoku: manageSudokuReducer
});