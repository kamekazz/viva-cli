import axios from 'axios';
import confing from '../confing'
import { AUTH_USER, AUTH_ERROR,AUTH_MSG,AUTH_USER_INFO, LIVE_SONG,FLASH_MESSAGES} from './types';

const apiUrl = confing.apiUrl

export const signup = (formProps, callback) => async dispatch => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/accounts/new`,
        formProps
      )
      if (response.data.message) {
        dispatch(newMassages(response.data.message,response.data.success));
      }
      dispatch({ type: AUTH_USER, payload: response.data.token });
      localStorage.setItem('token', response.data.token);
      callback();
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
    if (response.data.message) {
      dispatch(newMassages(response.data.message,response.data.success));
    }
    dispatch({ type: AUTH_USER, payload: response.data.token });
    dispatch({ type: AUTH_MSG, payload: response.data.message });
    dispatch({ type: AUTH_USER_INFO, payload: response.data.user });
    localStorage.setItem('token', response.data.token);
    callback();
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













// export const getPlaylist = (formProps, callback) => async dispatch => {
//   const config = {
//     headers: {'authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7I…yOTh9.1cv0Wjq2kc9UGVey0kETxGSq1PWlrFmUpi3Ymb0KNkc"}
//   }
//   try {
//     const response = await axios.get( 
//       `${apiUrl}/api/playlist/getall`,
//       '',
//       config
//     )
//     console.log('data back',response.data)
//     callback();
//   } catch (e) {
//     console.log(e)
//   }
// };
