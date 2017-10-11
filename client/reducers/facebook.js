import {
  FACEBOOK_ACCOUNT_FIND_SUCCESS,
  FACEBOOK_SELECT_ACCOUNT_SUCCESS
} from 'actions/facebook';

const initialState = null;

export default function reducer (state = initialState, action) {
  switch(action.type) {
    case FACEBOOK_ACCOUNT_FIND_SUCCESS :
    case FACEBOOK_SELECT_ACCOUNT_SUCCESS : {
      if(Array.isArray(action.data)) {
        return action.data[0];
      } else {
        return action.data;
      }
    }
    default :
      return state;
  }
}
