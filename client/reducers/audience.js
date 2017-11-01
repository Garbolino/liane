import {
  AUDIENCE_FIND_SUCCESS
} from 'actions/audience';

const initialState = {};

export default function reducer (state = initialState, action) {
  switch(action.type) {
    case AUDIENCE_FIND_SUCCESS : {
      if(Array.isArray(action.data) && action.data.length) {
        let newState = {};
        action.data.forEach(item => {
          newState[item.id] = item;
        });
        state = {
          ...state,
          ...newState
        };
      }
      return state;
    }
    default :
      return state;
  }
}
