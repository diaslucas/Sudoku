import { GET_SUDOKUS } from '../actions/types';

const initialState = {
  boardRows: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  boards: [],
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SUDOKUS:
      return {
        ...state, boards: action.payload
      };

    default:
      return state;
  }

}