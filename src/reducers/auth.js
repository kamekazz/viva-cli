import { AUTH_USER, AUTH_ERROR,AUTH_MSG,AUTH_USER_INFO, LIVE_SONG ,GIF } from '../actions/types';

const INITIAL_STATE = {
  authenticated: '',
  errorMessage: '',
  userInfo:[],
  liveSong:[],
  randamGif:[],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: action.payload };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
      case AUTH_MSG:
    return { ...state, errorMessage: action.payload };
      case AUTH_USER_INFO:
    return { ...state, userInfo: action.payload };
    case LIVE_SONG:
  return { ...state, liveSong: action.payload };
    case GIF:
  return { ...state, randamGif: action.payload };
    default:
       return state;
  }
 
}