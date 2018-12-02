import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import message from './falchmessages';

export default combineReducers({
  auth,
  form: formReducer,
  message:message
});

