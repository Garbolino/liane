import { AUDIENCE_FIND_SUCCESS } from "actions/audience";

const initialState = [];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case AUDIENCE_FIND_SUCCESS: {
      if (Array.isArray(action.data) && action.data.length) {
        state = action.data.map(item => item.id);
      }
      return state;
    }
    default:
      return state;
  }
}
