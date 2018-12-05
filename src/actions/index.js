import axios from 'axios';
import confing from '../confing'
import { AUTH_USER, AUTH_ERROR,AUTH_USER_INFO, LIVE_SONG,FLASH_MESSAGES,GIF} from './types';




const apiUrl = confing.apiUrl



export const signup = (formProps, callback) => async dispatch => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/accounts/new`,
        formProps
      )
      if (response.data.success) {
        dispatch(newMassages(response.data.message,response.data.success));
        
      }
      dispatch({ type: AUTH_USER, payload: response.data.token });
      localStorage.setItem('token', response.data.token);
      callback()
    } catch (e) {
      dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
    }
};

export const signin = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/accounts/login`,
      formProps
    )
    if (response.data.success) {
      dispatch(newMassages(response.data.message,response.data.success))
      localStorage.setItem('token', response.data.token)
      dispatch({ type: AUTH_USER, payload: response.data.token })
      dispatch({ type: AUTH_USER_INFO, payload: response.data.user })

      callback(true)
    }else{

      dispatch(newMassages(response.data.message,response.data.success))
      callback(false)
    }
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
  }
};


export const signout = () => {
  localStorage.removeItem('token');

  return {
    type: AUTH_USER,
    payload: ''
  };
};

export const liveSong = id => {
  return {
    type: LIVE_SONG,
    payload: id
  };
}

export const newMassages = (text,type) => {
  let payload = {
    text:text,
    type:type,
  }
  return {
    type: FLASH_MESSAGES,
    payload: payload
  };
  
}

export const  aGetGif = (playList) => async dispatch => {
  try {
    const response = await axios.get(
      `https://api.unsplash.com/photos/random?client_id=307694c6afc9cd55d02c32ec636ef1e15974cce8e3168e01e143a312b8576c77&query=${playList}`
    )
    console.log(response.data.urls.small)
    dispatch({ type: GIF, payload:  response.data.urls.small});
  } catch (e) {
    console.log(e)
  }
}











