import { SET_CREATE_USER_ALERT_MESSAGE, SET_CREATE_USER_ALERT_VISIBILITY, SET_USER_LOGGED_IN, LOGOUT } from './types';
import axios from 'axios';

export const createUser = user => dispatch => {
  if (isUserValid(user, dispatch)) {
    axios
      .post('/api/users', user)
      .then(res => {
        storeToken(res.data._id);
        dispatch({
          type: SET_USER_LOGGED_IN,
          payload: res.data._id
        });
      })
      .catch((err) => {
        if (err.response.status === 409) {
          let alert = [];
          alert.push(err.response.data.errors.username.message);
          dispatch({
            type: SET_CREATE_USER_ALERT_MESSAGE,
            payload: alert
          });
        }
        dispatch({
          type: SET_CREATE_USER_ALERT_VISIBILITY,
          payload: true
        });
      })
  }
};

const isUserValid = (user, dispatch) => {
  const { username, password, passwordConfirmation } = user;
  let alert = [];
  if (username === '') {
    alert.push("Username is required!");
  } else {
    if (username.length <= 4) {
      alert.push("Username is too short!");
    }
  }
  if (password === '') {
    alert.push("Password is required!");
  } else {
    if (password.length <= 4) {
      alert.push("Password is too short!");
    } else {
      if (password !== passwordConfirmation){
        alert.push("Password doesn't match with confirmation!");
      }
    }
  }

  if (alert.length > 0) {
    dispatch({
      type: SET_CREATE_USER_ALERT_MESSAGE,
      payload: alert
    });
    dispatch({
      type: SET_CREATE_USER_ALERT_VISIBILITY,
      payload: true
    });
    return false;
  }

  return true;

}

const storeToken = (token) => {
  localStorage.setItem('SudokuToken', token);
}

export const logOut = () => dispatch => {
  localStorage.removeItem('SudokuToken');
  dispatch({
    type: LOGOUT
  });
}