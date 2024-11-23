import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

console.log('BASE_URL', BASE_URL);
if (!BASE_URL) {
  throw new Error('VITE_API_URL is not defined');
}

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
