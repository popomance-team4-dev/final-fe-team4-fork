import axios, { AxiosInstance } from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

console.log('BASE_URL', BASE_URL);
if (!BASE_URL) {
  throw new Error('VITE_API_URL is not defined');
}

// Axios 인스턴스 생성
export const customInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 (필요하면 추가)
customInstance.interceptors.request.use(
  (config) => {
    // 요청 전에 실행할 작업 (예: 토큰 추가)
    // config.headers.Authorization = `Bearer ${yourToken}`;
    return config;
  },
  (error) => {
    // 요청 오류 처리
    return Promise.reject(error);
  }
);

// 응답 인터셉터
customInstance.interceptors.response.use(
  (response) => {
    // 응답 데이터를 바로 반환
    return response.data;
  },
  (error) => {
    // 오류 처리
    return Promise.reject(error);
  }
);
