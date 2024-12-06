import { useNavigate } from 'react-router-dom';

export const handleRedirectAfterLogin = (navigate: ReturnType<typeof useNavigate>) => {
  const redirectUrl = localStorage.getItem('redirectAfterLogin') || '/';
  localStorage.removeItem('redirectAfterLogin');
  navigate(redirectUrl);
};

export const handleNavigateBack = () => {
  window.history.back();
};
