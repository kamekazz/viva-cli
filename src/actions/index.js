import axios from 'axios';
import confing from '../confing'
import { AUTH_USER, AUTH_ERROR,AUTH_USER_INFO, LIVE_SONG,FLASH_MESSAGES,GIF} from './types';




const apiUrl = confing.apiUrl
const giphyAPI_KEY = confing.giphyAPI_KEY


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
      `http://api.giphy.com/v1/gifs/random?api_key=j0HBRP5jD63FuDip0ODotIluJIEOiKBw&tag=${playList}`
    )
    console.log(response.data.data.image_original_url)
    dispatch({ type: GIF, payload:  response.data.data.image_original_url});
  } catch (e) {
    console.log(e)
  }
}











