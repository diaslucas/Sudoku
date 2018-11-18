import { SET_CREATE_USER_ALERT_MESSAGE, SET_CREATE_USER_ALERT_VISIBILITY, SET_USER_LOGGED_IN, LOGOUT, RESET_ALERT } from './types';
import axios from 'axios';

export const createUser = user => dispatch => {
  axios
  .post('/api/users', user)
  .then(res => {
    if(res.data.success){
      dispatch({
        type: SET_USER_LOGGED_IN,
        payload: res.data.user
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
      dispatch({
        type: SET_USER_LOGGED_IN,
        payload: res.data.user
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


export const isUserLoggedIn = () => dispatch => {
  axios
  .post('/api/users/userLoggedIn')
  .then(res => {
    if(res.data.success){
      dispatch({
        type: SET_USER_LOGGED_IN,
        payload: res.data.user
      });
    }
  })
}

export const resetAlert = () => dispatch => {
  dispatch({
    type: RESET_ALERT
  });
};

export const logOut = () => dispatch => {
  axios
  .post('/api/users/logout')
  .then(res => {
    if(res.data.success){
      dispatch({
        type: LOGOUT
      });
    }
  })
}