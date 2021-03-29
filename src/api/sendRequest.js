import axios from './axios';

const sendRequest = async ({ method, url, data, headers }) => {
  const response = await axios({
    method,
    url,
    data,
    headers
  });

  return response.data.data;
};

export default sendRequest;
