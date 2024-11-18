import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = 'http://api.popomance.kr:8080';

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    ...config,
  });

  instance.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
  );

  return instance(config) as Promise<T>;
};
