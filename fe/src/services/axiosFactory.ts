import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';

/**
 * Creates a new instance of axios with a custom config
 *
 * @type {AxiosInstance} client
 */
const client: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});

/**
 * Axios instance that uses auth0 access token
 *
 * @param {AxiosRequestConfig} requestConfigOptions
 * @returns {Promise}
 */
const getAxiosApi = (requestConfigOptions: AxiosRequestConfig) => {
  const onSuccess = (response: AxiosResponse) => {
    return Promise.resolve(response);
  };

  return client(requestConfigOptions).then(onSuccess);
};

export default getAxiosApi;
