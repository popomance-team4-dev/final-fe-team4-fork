import { createBrowserRouter } from 'react-router-dom';

import Layout from '@/layouts/Layout';
import AccountRecoveryPage from '@/pages/AccountRecoveryPage';
import CONCATPage from '@/pages/CONCATPage';
import ErrorPage from '@/pages/ErrorPage';
import HomePage from '@/pages/HomePage';
import ProjectsPage from '@/pages/ProjectsPage';
import SigninPage from '@/pages/SigninPage';
import SignupPage from '@/pages/SignupPage';
import TTSPage from '@/pages/TTSPage';
import VCPage from '@/pages/VCPage';

const PATH = {
  HOME: '/',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  ACCOUNT_RECOVERY: '/account-recovery',
  PROJECTS: '/projects',
  TTS: '/tts',
  VC: '/vc',
  CONCAT: '/concat',
  ERROR: '/error',
} as const;

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    // 모든 라우트에 대한 에러 처리
    errorElement: <ErrorPage />,
    children: [
      {
        path: PATH.SIGNIN,
        element: <SigninPage />,
      },
      {
        path: PATH.SIGNUP,
        element: <SignupPage />,
      },
      {
        path: PATH.ACCOUNT_RECOVERY,
        element: <AccountRecoveryPage />,
      },
      // 특정 에러 페이지 경로
      {
        path: PATH.ERROR,
        element: <ErrorPage />,
      },
      // 그 외 모든 페이지들
      {
        path: PATH.HOME,
        element: <HomePage />,
      },
      {
        path: PATH.PROJECTS,
        element: <ProjectsPage />,
      },
      {
        path: PATH.TTS,
        element: <TTSPage />,
      },
      {
        path: PATH.CONCAT,
        element: <CONCATPage />,
      },
      {
        path: PATH.VC,
        element: <VCPage />,
      },
      // 404 에러 페이지
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);

export { PATH, router };
