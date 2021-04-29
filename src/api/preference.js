import sendRequest from './sendRequest';

/**
 * Get user settings
 */
export const getPreferences = async (token) => {
  const responseData = await sendRequest({
    method: 'get',
    url: '/preferences',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return responseData;
};

/**
 * Change user settings
 */
export const changePreferences = async (data, token) => {
  const responseData = await sendRequest({
    method: 'put',
    url: '/preferences',
    data,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return responseData;
};
