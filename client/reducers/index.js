import { combineReducers } from 'redux';
import auth from './auth';
import campaigns from './campaigns';
import people from './people';
import facebook from './facebook';

export default function () {
  return combineReducers({
    auth,
    campaign: campaigns,
    people,
    facebookAccount: facebook
  });
}
