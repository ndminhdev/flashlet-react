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
    url: `/sets/subject/${keyword}?limit=${limit}&page=${page}&sortBy=${sortBy}&orderBy=${orderBy}`
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

export const uploadImage = async (data, token) => {
  const responseData = await sendRequest({
    method: 'post',
    url: `/sets/upload-image`,
    data,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return responseData;
};
