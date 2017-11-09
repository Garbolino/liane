import { combineReducers } from "redux";
import auth from "./auth";
import campaigns from "./campaigns";
import people from "./people";
import accountPeople from "./accountPeople";
import audience from "./audience";
import accountAudience from "./accountAudience";
import accountCampaigns from "./accountCampaigns";
import campaignAccounts from "./campaignAccounts";
import facebookAccounts from "./facebook";
import { routerReducer } from "react-router-redux";

export default function() {
  return combineReducers({
    auth,
    campaigns,
    accountCampaigns,
    people,
    accountPeople,
    audience,
    accountAudience,
    facebookAccounts,
    campaignAccounts,
    router: routerReducer
  });
}
