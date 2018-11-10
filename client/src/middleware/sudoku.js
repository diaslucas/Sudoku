const sudoku = ({ dispatch, getState }) => next => action => {
  console.log('ACTION: ' + action.type, action);

  next(action);
}

export default sudoku;