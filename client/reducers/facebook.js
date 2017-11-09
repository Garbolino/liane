import {
  FACEBOOK_ACCOUNT_FIND_SUCCESS,
  FACEBOOK_ACCOUNT_GET_SUCCESS,
  FACEBOOK_SELECT_ACCOUNT_SUCCESS
} from "actions/facebook";

const initialState = null;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FACEBOOK_ACCOUNT_GET_SUCCESS: {
      if (action.data) {
        return action.data;
      }
      return state;
    }
    case FACEBOOK_ACCOUNT_FIND_SUCCESS:
      if (Array.isArray(action.data) && action.data.length) {
        let newState = {};
        action.data.forEach(campaign => {
          newState[campaign.id] = campaign;
        });
        state = {
          ...state,
          ...newState
        };
      }
      return state;
    // case FACEBOOK_SELECT_ACCOUNT_SUCCESS: {
    //   if (Array.isArray(action.data)) {
    //     if (action.data[0]) {
    //       return action.data[0];
    //     } else {
    //       return state;
    //     }
    //   } else if (action.data) {
    //     return action.data;
    //   }
    //   return state;
    // }
    default:
      return state;
  }
}
