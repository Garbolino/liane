import client from "services/feathers";
import { authenticate } from "actions/auth";

export default function init(store) {
  const jwt = localStorage.getItem("feathers-jwt");
  if (jwt !== null || document.cookie.indexOf("jwt") !== -1) {
    store.dispatch(authenticate());
  }
}

// Utils

export function hasRole(auth, role) {
  if (auth.signedIn && Array.isArray(auth.user.roles)) {
    return auth.user.roles.indexOf(role) !== -1;
  } else {
    return false;
  }
}

export function displayName(auth) {
  if (auth.signedIn && auth.user.facebookData) {
    return auth.user.facebookData.name;
  }
  return "";
}

export function hasUser(auth) {
  console.log(auth);
  return auth.signedIn;
}
