import client from 'services/feathers';

const service = client.service('facebookAccounts');

export const FACEBOOK_SELECT_ACCOUNT_REQUEST = 'FACEBOOK_SELECT_ACCOUNT_REQUEST';
export const FACEBOOK_SELECT_ACCOUNT_SUCCESS = 'FACEBOOK_SELECT_ACCOUNT_SUCCESS';
export const FACEBOOK_SELECT_ACCOUNT_FAILURE = 'FACEBOOK_SELECT_ACCOUNT_FAILURE';

export const FACEBOOK_ACCOUNT_FIND_REQUEST = 'FACEBOOK_ACCOUNT_FIND_REQUEST';
export const FACEBOOK_ACCOUNT_FIND_SUCCESS = 'FACEBOOK_ACCOUNT_FIND_SUCCESS';
export const FACEBOOK_ACCOUNT_FIND_FAILURE = 'FACEBOOK_ACCOUNT_FIND_FAILURE';

const selectAccountRequest = request => {
  return {
    type: FACEBOOK_SELECT_ACCOUNT_REQUEST,
    request
  }
};

const selectAccountSuccess = (request, data) => {
  return {
    type: FACEBOOK_SELECT_ACCOUNT_SUCCESS,
    request,
    data
  }
};

const selectAccountFailure = (request, err) => {
  return {
    type: FACEBOOK_SELECT_ACCOUNT_FAILURE,
    request,
    err
  }
};

const findRequest = query => {
  return {
    type: FACEBOOK_ACCOUNT_FIND_REQUEST,
    query
  }
};
const findSuccess = (query, data) => {
  return {
    type: FACEBOOK_ACCOUNT_FIND_SUCCESS,
    query,
    data
  }
};
const findFailure = (query, err) => {
  return {
    type: FACEBOOK_ACCOUNT_FIND_FAILURE,
    query,
    err
  }
};

export const selectAccount = request => dispatch => {
  dispatch(selectAccountRequest(request));
  service.create(request).then(data => {
    dispatch(selectAccountSuccess(request, data));
  }).catch(err => {
    dispatch(selectAccountFailure(request, err));
  })
};

export const findAccount = request => dispatch => {
  dispatch(findRequest(request));
  service.find(request).then(res => {
    dispatch(findSuccess(request, res.data));
  }).catch(err => {
    dispatch(findFailure(request, err));
  });
}
