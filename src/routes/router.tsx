import { createBrowserRouter } from 'react-router-dom';

import Layout from '@/components/layouts/Layout';
import NavbarLayout from '@/components/layouts/NavbarLayout';
import AccountRecoveryPage from '@/pages/AccountRecoveryPage';
import ConcatPage from '@/pages/ConcatPage';
import ExamplePage from '@/pages/ExamplePage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import TTSPage from '@/pages/TTSPage';
import VCPage from '@/pages/VCPage';
import WorkspacePage from '@/pages/WorkspacePage';

const PATH = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  WORKSPACE: '/workspace',
  ACCOUNT_RECOVERY: '/account-recovery',
  TTS: '/tts',
  CONCAT: '/concat',
  VC: '/vc',
  EXAMPLE: '/example',
} as const;

const router = createBrowserRouter([
  // 네비바X, 로그인, 회원가입, 비밀번호 찾기 라우트
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: PATH.EXAMPLE,
        element: <ExamplePage />,
      },
      {
        path: PATH.LOGIN,
        element: <LoginPage />,
      },
      {
        path: PATH.SIGNUP,
        element: <SignupPage />,
      },
      {
        path: PATH.ACCOUNT_RECOVERY,
        element: <AccountRecoveryPage />,
      },
      // 네비바o, TTS, Concat, VC 라우트
      {
        path: '/',
        element: <NavbarLayout />,
        children: [
          {
            path: PATH.WORKSPACE,
            element: <WorkspacePage />,
          },
          {
            path: PATH.TTS,
            element: <TTSPage />,
          },
          {
            path: PATH.CONCAT,
            element: <ConcatPage />,
          },
          {
            path: PATH.VC,
            element: <VCPage />,
          },
        ],
      },
    ],
  },
]);

export { PATH, router };
