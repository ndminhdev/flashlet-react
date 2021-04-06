import sendRequest from './sendRequest';

export const createCollection = async (data, token) => {
  const responseData = await sendRequest({
    method: 'post',
    url: '/collections',
    data,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return responseData;
};

export const getMyCollections = async (token) => {
  const responseData = await sendRequest({
    method: 'get',
    url: '/collections',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return responseData;
};

export const searchCollections = async (keyword) => {
  const responseData = await sendRequest({
    method: 'get',
    url: `/collections/search/${keyword}`
  });
  return responseData;
};

export const getMyCollectionById = async (id, token) => {
  const responseData = await sendRequest({
    method: 'get',
    url: `/collections/${id}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return responseData;
};

export const updateCollection = async (id, data, token) => {
  const responseData = await sendRequest({
    method: 'put',
    url: `/collections/${id}`,
    data,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return responseData;
};

export const deleteCollection = async (id, token) => {
  const responseData = await sendRequest({
    method: 'delete',
    url: `/collections/${id}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return responseData;
};

export const addCard = async (id, data, token) => {
  const responseData = await sendRequest({
    method: 'post',
    url: `/collections/${id}/cards`,
    data,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return responseData;
};

export const getCards = async (id, token) => {
  const responseData = await sendRequest({
    method: 'get',
    url: `/collections/${id}/cards`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return responseData;
};

export const updateCard = async (id, cardId, data, token) => {
  const responseData = await sendRequest({
    method: 'patch',
    url: `/collections/${id}/cards/${cardId}`,
    data,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return responseData;
};

export const removeCard = async (id, cardId, token) => {
  const responseData = await sendRequest({
    method: 'delete',
    url: `/collections/${id}/cards/${cardId}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return responseData;
};
