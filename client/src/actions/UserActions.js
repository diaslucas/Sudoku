import { SET_CREATE_USER_ALERT_MESSAGE, SET_CREATE_USER_ALERT_VISIBILITY, SET_USER_LOGGED_IN, LOGOUT, RESET_ALERT } from './types';
import axios from 'axios';

export const createUser = user => dispatch => {
  axios
  .post('/api/users', user)
  .then(res => {
    if(res.data.success){
      storeToken(res.data._id);
      dispatch({
        type: SET_USER_LOGGED_IN,
        payload: res.data._id
      });
    } else {
      dispatch({
        type: SET_CREATE_USER_ALERT_MESSAGE,
        payload: res.data.message
      });
      dispatch({
        type: SET_CREATE_USER_ALERT_VISIBILITY,
        payload: true
      });
    }
  })
  .catch(err => {
    console.log(err.message);
  })
};


export const login = user => dispatch => {
  axios
    .post('/api/users/login', user)
    .then(res => {
      storeToken(res.data.token);
      storeUsername(res.data.username);
      dispatch({
        type: SET_USER_LOGGED_IN,
        payload: {token: res.data.token, username: res.data.username}
      });
    })
    .catch((err) => {
      if (err.response.status === 500) {
        let alert = [];
        alert.push(err.response.data.message);
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
};

export const resetAlert = () => dispatch => {
  dispatch({
    type: RESET_ALERT
  });
};

const storeToken = (token) => {
  localStorage.setItem('SudokuToken', token);
}

const storeUsername = (username) => {
  localStorage.setItem('SudokuUsername', username);
}

export const logOut = () => dispatch => {
  localStorage.removeItem('SudokuToken');
  dispatch({
    type: LOGOUT
  });
}