import axios from 'axios';
import confing from '../confing'
import { AUTH_USER, AUTH_ERROR,AUTH_USER_INFO, LIVE_SONG,FLASH_MESSAGES,GIF,DialogColest,Dialog} from './types';




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
    payload: null
  };
}

export const signout2 = () => {
  localStorage.removeItem('token');
  return {
    type: AUTH_USER_INFO,
    payload: null
  };
}

export const signout3 = () => {
  localStorage.removeItem('token');
  return {
    type: LIVE_SONG,
    payload: null
  }
}

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
    dispatch({ type: GIF, payload:  response.data.urls.small});
  } catch (e) {
    console.log(e)
  }
}

export const acDialog = (heder,text,modulo,type) => {
  let payload = {
    heder:heder,
    text:text,
    modulo:modulo,
    type:type,
  }
  if (type) {
    return {
        type: Dialog,
        payload: payload
    };
  } else {
    return {
      type: DialogColest
    }
  }
}

export const acDeletyPlaylist = (id) => async dispatch => {
  let yourConfig = {
    headers: {
      Authorization:  localStorage.getItem('token')
    }
  }
  try {
    const response = await axios.delete(
      `${apiUrl}/api/playlist/delete/${id}`,
      yourConfig
    )
    if (response.data.success) {
      dispatch(newMassages(response.data.message,response.data.success))
    }else{
      dispatch(newMassages(response.data.message,response.data.success))
    }
  } catch (e) {
    console.log(e)
  }
}

// router.delete('/delete/:id', checkJwt, (req,res,next) =>{
//   let playlistID = req.params.id
//   let msdId = req.decoded.user._id

//   Playlist.findOne({_id: playlistID  },(err, fandplaylist)=>{
//       if (err) return next(err);
//       if (fandplaylist.ownerId === msdId) {
//           fandplaylist.remove()
//           res.json({
//               success:true,
//               message:'delete'
//           })
//       } else {
//           res.json({
//               success:false,
//               message:'not owner'
//           })
//       }
//   })
// })











