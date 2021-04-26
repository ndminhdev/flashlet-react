import sendRequest from './sendRequest';

export const signUp = async (data) => {
  const responseData = await sendRequest({
    method: 'post',
    url: '/users/signup',
    data
  });
  return responseData;
};

export const signIn = async (data) => {
  const responseData = await sendRequest({
    method: 'post',
    url: '/users/signin',
    data
  });
  return responseData;
};

export const signOut = async (token) => {
  const responseData = await sendRequest({
    method: 'delete',
    url: '/users/signout',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return responseData;
};

export const signOutAll = async (token) => {
  const responseData = await sendRequest({
    method: 'delete',
    url: '/users/signout/all',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return responseData;
};

export const forgotPassword = async (data) => {
  const responseData = await sendRequest({
    method: 'post',
    url: '/users/password/forgot',
    data
  });
  return responseData;
};

export const resetPassword = async (data, token) => {
  const responseData = await sendRequest({
    method: 'post',
    url: `/users/password/reset?token=${token}`,
    data
  });
  return responseData;
};

export const changePassword = async (data, token) => {
  const responseData = await sendRequest({
    method: 'post',
    url: 'users/password/change',
    data,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return responseData;
};

export const getUserProfile = async (username) => {
  const responseData = await sendRequest({
    method: 'get',
    url: `/users/${username}`
  });
  return responseData;
};

export const getPublicSetsOfAnUser = (username) => async ({
  page = 1,
  sortBy = 'title',
  orderBy = 1,
  limit = 8
}) => {
  const responseData = await sendRequest({
    method: 'get',
    url: `/users/${username}/sets?limit=${limit}&page=${page}&sortBy=${sortBy}&orderBy=${orderBy}`
  });
  return responseData;
};

export const changeProfile = async (data, token) => {
  const responseData = await sendRequest({
    method: 'patch',
    url: '/users/me',
    data,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return responseData;
};

export const deleteAccount = async (token) => {
  const responseData = await sendRequest({
    method: 'delete',
    url: '/users/me',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return responseData;
};
