import { CAMPAIGN_FIND_SUCCESS } from "actions/campaigns";

const initialState = [];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CAMPAIGN_FIND_SUCCESS: {
      if (Array.isArray(action.data) && action.data.length) {
        state = action.data.map(item => item.id);
      }
      return state;
    }
    default:
      return state;
  }
}
