import {
  CAMPAIGN_CREATE_SUCCESS,
  CAMPAIGN_GET_SUCCESS,
  CAMPAIGN_FIND_SUCCESS
} from "actions/campaigns";

const initialState = null;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CAMPAIGN_GET_SUCCESS: {
      if (action.data) {
        return action.data;
      }
      return state;
    }
    case CAMPAIGN_FIND_SUCCESS: {
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
    }
    default:
      return state;
  }
}
