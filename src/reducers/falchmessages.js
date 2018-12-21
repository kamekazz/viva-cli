import { FLASH_MESSAGES ,Dialog,DialogColest} from '../actions/types';

const INITIAL_STATE = {
  newMessages:[],
  dialog:false,
  
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FLASH_MESSAGES:
      return { ...state, newMessages: action.payload };
      case Dialog:
    return { ...state, dialog: action.payload };
      case DialogColest:
    return { ...state,dialog:false};
    default:
       return state;
  }
 
}