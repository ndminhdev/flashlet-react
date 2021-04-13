import sendRequest from './sendRequest';

export const createSet = async (data, token) => {
  const responseData = await sendRequest({
    method: 'post',
    url: '/sets',
    data,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return responseData;
};

export const getMySets = async (token) => {
  const responseData = await sendRequest({
    method: 'get',
    url: '/sets',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return responseData;
};

export const searchSets = async (
  keyword,
  page = 1,
  sortBy = 'title',
  orderBy = 1,
  limit = 8
) => {
  const responseData = await sendRequest({
    method: 'get',
    url: `/subject/${keyword}?limit=${limit}&page=${page}&sortBy=${sortBy}&orderBy=${orderBy}`
  });
  return responseData;
};

export const getMySetById = async (id, token) => {
  const responseData = await sendRequest({
    method: 'get',
    url: `/sets/${id}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return responseData;
};

export const updateSet = async (id, data, token) => {
  const responseData = await sendRequest({
    method: 'put',
    url: `/sets/${id}`,
    data,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return responseData;
};

export const deleteSet = async (id, token) => {
  const responseData = await sendRequest({
    method: 'delete',
    url: `/sets/${id}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return responseData;
};

export const addCard = async (id, data, token) => {
  const responseData = await sendRequest({
    method: 'post',
    url: `/sets/${id}/cards`,
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
    url: `/sets/${id}/cards`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return responseData;
};

export const updateCard = async (id, cardId, data, token) => {
  const responseData = await sendRequest({
    method: 'patch',
    url: `/sets/${id}/cards/${cardId}`,
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
    url: `/sets/${id}/cards/${cardId}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return responseData;
};
