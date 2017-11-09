import { CAMPAIGN_SET } from "actions/campaigns";

const initialState = null;

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CAMPAIGN_SET: {
      if (action.data) {
        return action.data;
      }
      return state;
    }
    default:
      return state;
  }
}
