import { FLASH_MESSAGES } from '../actions/types';

const INITIAL_STATE = {

  newMessages:[]
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FLASH_MESSAGES:
      return { ...state, newMessages: action.payload };
    default:
       return state;
  }
 
}