import client from 'services/feathers';

const service = client.service('facebookAudience');

export const AUDIENCE_FIND_REQUEST = 'AUDIENCE_FIND_REQUEST';
export const AUDIENCE_FIND_SUCCESS = 'AUDIENCE_FIND_SUCCESS';
export const AUDIENCE_FIND_FAILURE = 'AUDIENCE_FIND_FAILURE';

const findRequest = query => {
  return {
    type: AUDIENCE_FIND_REQUEST,
    query
  }
};
const findSuccess = (query, data) => {
  return {
    type: AUDIENCE_FIND_SUCCESS,
    query,
    data
  }
};
const findFailure = (query, err) => {
  return {
    type: AUDIENCE_FIND_FAILURE,
    query,
    err
  }
};

export const findAudience = request => dispatch => {
  dispatch(findRequest(request));
  service.find(request).then(res => {
    dispatch(findSuccess(request, res.data));
  }).catch(err => {
    dispatch(findFailure(request, err));
  });
}
