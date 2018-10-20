import { CREATE_USER, SET_CREATE_USER_ALERT_MESSAGE, SET_CREATE_USER_ALERT_VISIBILITY, LOGIN, LOGOUT, USER_LOGGED_IN } from '../actions/types';  

const initialState = {
  username: '',
  password: '',
  alert: { message: 'Sorry! Something went wrong', visible: false } 
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
      
      default:
        return state;
  }
}