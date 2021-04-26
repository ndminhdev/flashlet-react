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

export const getMySets = async (
  { page = 1, sortBy = 'title', orderBy = 1, limit = 8 },
  token
) => {
  const responseData = await sendRequest({
    method: 'get',
    url: `/sets?limit=${limit}&page=${page}&sortBy=${sortBy}&orderBy=${orderBy}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return responseData;
};

export const searchSets = async ({
  keyword,
  page = 1,
  sortBy = 'title',
  orderBy = 1,
  limit = 8
}) => {
  const responseData = await sendRequest({
    method: 'get',
    url: `/sets/subject/${keyword}?limit=${limit}&page=${page}&sortBy=${sortBy}&orderBy=${orderBy}`
  });
  return responseData;
};

export const getSetById = async (setId) => {
  const responseData = await sendRequest({
    method: 'get',
    url: `/sets/${setId}`
  });
  return responseData;
};

export const updateSet = async (setId, data, token) => {
  const responseData = await sendRequest({
    method: 'put',
    url: `/sets/${setId}`,
    data,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return responseData;
};

export const deleteSet = async (setId, token) => {
  const responseData = await sendRequest({
    method: 'delete',
    url: `/sets/${setId}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return responseData;
};

export const addCard = async (setId, data, token) => {
  const responseData = await sendRequest({
    method: 'post',
    url: `/sets/${setId}/cards`,
    data,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return responseData;
};

export const editCard = async (cardId, data, token) => {
  const responseData = await sendRequest({
    method: 'put',
    url: `/cards/${cardId}`,
    data,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return responseData;
};

export const removeCard = async (cardId, token) => {
  const responseData = await sendRequest({
    method: 'delete',
    url: `/cards/${cardId}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return responseData;
};

export const checkOwner = async (setId, token) => {
  const responseData = await sendRequest({
    method: 'get',
    url: `/sets/check/${setId}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return responseData;
};
