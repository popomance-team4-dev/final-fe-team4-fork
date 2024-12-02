import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuthStore } from '@/stores/auth.store';

const ProtectedRoute: React.FC = () => {
  const { user } = useAuthStore();

  // 로그인 여부 확인
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // 로그인 상태면 해당 라우트를 렌더링
  return <Outlet />;
};

export default ProtectedRoute;
