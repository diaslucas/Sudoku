import { CREATE_USER, SET_CREATE_USER_ALERT_MESSAGE, SET_CREATE_USER_ALERT_VISIBILITY, 
  LOGOUT, SET_USER_LOGGED_IN, RESET_ALERT } from '../actions/types';  

let userID = localStorage.getItem('userID');

const initialState = {
  username: '',
  password: '',
  alert: { message: ['Sorry! Something went wrong'], visible: false }, 
  userLoggedIn: userID
}

export default function(state = initialState, action) {
  switch(action.type) {
    case CREATE_USER:
      return {
        ...state
      };
      
      case SET_CREATE_USER_ALERT_MESSAGE:
      return {
        ...state, alert: { ...state.alert, message: action.payload }, 
      }

      case SET_CREATE_USER_ALERT_VISIBILITY:
      return {
        ...state, alert: { ...state.alert, visible: action.payload }, 
      }
      
      case SET_USER_LOGGED_IN:
      return {
        ...state, userLoggedIn: action.payload 
      } 

      case LOGOUT:
      return {
        ...state, userLoggedIn: null
      }

      case RESET_ALERT:
        return {
          ...state, alert: { message: ['Sorry! Something went wrong'], visible: false}
        }
      
      default:
        return state;
  }
}