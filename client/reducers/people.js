import {
  PEOPLE_FIND_SUCCESS
} from 'actions/people';

const initialState = {};

export default function reducer (state = initialState, action) {
  switch(action.type) {
    case PEOPLE_FIND_SUCCESS : {
      if(Array.isArray(action.data) && action.data.length) {
        let newState = {};
        action.data.forEach(person => {
          newState[person.id] = person;
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
