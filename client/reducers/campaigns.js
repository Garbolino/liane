import {
  CAMPAIGN_CREATE_SUCCESS,
  CAMPAIGN_GET_SUCCESS,
  CAMPAIGN_FIND_SUCCESS
} from 'actions/campaigns';

const initialState = null;

export default function reducer (state = initialState, action) {
  switch(action.type) {
    case CAMPAIGN_CREATE_SUCCESS :
    case CAMPAIGN_GET_SUCCESS :
    case CAMPAIGN_FIND_SUCCESS : {
      if(Array.isArray(action.data)) {
        if(action.data[0]) {
          return action.data[0];
        } else {
          return null;
        }
      } else if(action.data) {
        return action.data;
      }
      return null;
    }
    default :
      return state;
  }
}
