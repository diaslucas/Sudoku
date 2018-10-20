import { CREATE_USER, SET_CREATE_USER_ALERT_MESSAGE, SET_CREATE_USER_ALERT_VISIBILITY, LOGIN } from './types';  
import axios from 'axios';

export const createUser = user => dispatch => {
    axios
    .post('/api/users', user)
    .then(res => {
      console.log("User created: " + res.data);
    })
    .catch((err) => {
      if(err.response.status === 409){
        dispatch({
          type: SET_CREATE_USER_ALERT_MESSAGE,
          payload:  err.response.data.errors.username.message
        })
      }
      dispatch({
        type: SET_CREATE_USER_ALERT_VISIBILITY,  
        payload: true
      })
    })
};