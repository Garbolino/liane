import client from 'services/feathers';

const service = client.service('people');

export const PEOPLE_FIND_REQUEST = 'PEOPLE_FIND_REQUEST';
export const PEOPLE_FIND_SUCCESS = 'PEOPLE_FIND_SUCCESS';
export const PEOPLE_FIND_FAILURE = 'PEOPLE_FIND_FAILURE';

const findRequest = query => {
  return {
    type: PEOPLE_FIND_REQUEST,
    query
  }
};
const findSuccess = (query, data) => {
  return {
    type: PEOPLE_FIND_SUCCESS,
    query,
    data
  }
};
const findFailure = (query, err) => {
  return {
    type: PEOPLE_FIND_FAILURE,
    query,
    err
  }
};

export const findPeople = request => dispatch => {
  dispatch(findRequest(request));
  service.find(request).then(res => {
    dispatch(findSuccess(request, res.data));
  }).catch(err => {
    dispatch(findFailure(request, err));
  });
}
