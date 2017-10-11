import client from 'services/feathers';

const service = client.service('campaigns');

export const CAMPAIGN_LOAD = 'CAMPAIGN_LOAD';

export const CAMPAIGN_NEW = 'CAMPAIGN_NEW';
export const CAMPAIGN_UPDATE = 'CAMPAIGN_UPDATE';
export const CAMPAIGN_REMOVE = 'CAMPAIGN_REMOVE';

export const CAMPAIGN_GET_REQUEST = 'CAMPAIGN_GET_REQUEST';
export const CAMPAIGN_GET_SUCCESS = 'CAMPAIGN_GET_SUCCESS';
export const CAMPAIGN_GET_FAILURE = 'CAMPAIGN_GET_FAILURE';

export const CAMPAIGN_FIND_REQUEST = 'CAMPAIGN_FIND_REQUEST';
export const CAMPAIGN_FIND_SUCCESS = 'CAMPAIGN_FIND_SUCCESS';
export const CAMPAIGN_FIND_FAILURE = 'CAMPAIGN_FIND_FAILURE';

export const CAMPAIGN_CREATE_REQUEST = 'CAMPAIGN_CREATE_REQUEST';
export const CAMPAIGN_CREATE_SUCCESS = 'CAMPAIGN_CREATE_SUCCESS';
export const CAMPAIGN_CREATE_FAILURE = 'CAMPAIGN_CREATE_FAILURE';

export const CAMPAIGN_PATCH_REQUEST = 'CAMPAIGN_PATCH_REQUEST';
export const CAMPAIGN_PATCH_SUCCESS = 'CAMPAIGN_PATCH_SUCCESS';
export const CAMPAIGN_PATCH_FAILURE = 'CAMPAIGN_PATCH_FAILURE';

export const CAMPAIGN_REMOVE_REQUEST = 'CAMPAIGN_REMOVE_REQUEST';
export const CAMPAIGN_REMOVE_SUCCESS = 'CAMPAIGN_REMOVE_SUCCESS';
export const CAMPAIGN_REMOVE_FAILURE = 'CAMPAIGN_REMOVE_FAILURE';

const _load = (id, quiet) => {
  return {
    type: CAMPAIGN_LOAD,
    id,
    quiet
  }
};

const _new = (id, data) => {
  return {
    type: CAMPAIGN_NEW,
    id,
    data
  }
};
const _update = (id, data) => {
  return {
    type: CAMPAIGN_UPDATE,
    id,
    data
  }
};
const _remove = (id, data) => {
  return {
    type: CAMPAIGN_REMOVE,
    id,
    data
  }
};

const getRequest = id => {
  return {
    type: CAMPAIGN_GET_REQUEST,
    id
  }
};
const getSuccess = (id, data) => {
  return {
    type: CAMPAIGN_GET_SUCCESS,
    id,
    data
  }
};
const getFailure = (id, err) => {
  return {
    type: CAMPAIGN_GET_FAILURE,
    id,
    err
  }
};

const findRequest = query => {
  return {
    type: CAMPAIGN_FIND_REQUEST,
    query
  }
};
const findSuccess = (query, data) => {
  return {
    type: CAMPAIGN_FIND_SUCCESS,
    query,
    data
  }
};
const findFailure = (query, err) => {
  return {
    type: CAMPAIGN_FIND_FAILURE,
    query,
    err
  }
};

const createRequest = data => {
  return {
    type: CAMPAIGN_CREATE_REQUEST,
    data
  }
};
const createSuccess = data => {
  return {
    type: CAMPAIGN_CREATE_SUCCESS,
    data
  }
};
const createFailure = err => {
  return {
    type: CAMPAIGN_CREATE_FAILURE,
    err
  }
};

const patchRequest = (id, data) => {
  return {
    type: CAMPAIGN_PATCH_REQUEST,
    id,
    data
  }
};
const patchSuccess = (id, data) => {
  return {
    type: CAMPAIGN_PATCH_SUCCESS,
    id,
    data
  }
};
const patchFailure = (id, err) => {
  return {
    type: CAMPAIGN_PATCH_FAILURE,
    id,
    err
  }
};

const removeRequest = (id, data) => {
  return {
    type: CAMPAIGN_REMOVE_REQUEST,
    id
  }
};
const removeSuccess = (id, data) => {
  return {
    type: CAMPAIGN_REMOVE_SUCCESS,
    id,
    data
  }
};
const removeFailure = (id, err) => {
  return {
    type: CAMPAIGN_REMOVE_FAILURE,
    id,
    err
  }
};

const get = id => dispatch => {
  dispatch(getRequest(id));
  service.get(id).then(data => {
    dispatch(getSuccess(id, data));
  }).catch(err => {
    dispatch(getFailure(id, err));
  });
};

export const loadCampaign = id => dispatch => {
  return dispatch(get(id));
};

export const findCampaigns = query => dispatch => {
  dispatch(findRequest(query));
  service.find(query).then(res => {
    dispatch(findSuccess(query, res.data));
  }).catch(err => {
    dispatch(findFailure(query, err));
  });
};

export const createCampaign = data => dispatch => {
  dispatch(createRequest(data));
  service.create(data).then(res => {
    dispatch(createSuccess(res));
  }).catch(err => {
    dispatch(createFailure(err));
  });
}

export const removeCampaign = id => dispatch => {
  dispatch(removeRequest(id));
  service.remove(id).then(data => {
    dispatch(removeSuccess(id, data));
  }).catch(err => {
    dispatch(removeFailure(id, err));
  });
};

// Socket events actions
export const created = data => dispatch => {
  return dispatch(_new(data.id, data));
};
export const patched = data => dispatch => {
  return dispatch(_update(data.id, data));
};
export const removed = data => dispatch => {
  return dispatch(_remove(data.id, data));
};
