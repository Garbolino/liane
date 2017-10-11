import {
  CAMPAIGN_CREATE_SUCCESS,
  CAMPAIGN_GET_SUCCESS,
  CAMPAIGN_FIND_SUCCESS
} from 'actions/campaigns';

const initialState = null;

export default function reducer (state = initialState, action) {
  switch(action.type) {
    case CAMPAIGN_CREATE_SUCCESS :
    case CAMPAIGN_GET_SUCCESS : {
      return action.data;
    }
    case CAMPAIGN_FIND_SUCCESS : {
      return action.data[0];
    }
    default :
      return state;
  }
}
