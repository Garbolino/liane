import { combineReducers } from 'redux';
import auth from './auth';
import campaigns from './campaigns';
import people from './people';
import accountPeople from './accountPeople';
import audience from './audience';
import accountAudience from './accountAudience';
import facebook from './facebook';

export default function () {
  return combineReducers({
    auth,
    campaign: campaigns,
    people,
    accountPeople,
    audience,
    accountAudience,
    facebookAccount: facebook
  });
}
