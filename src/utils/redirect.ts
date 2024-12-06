export const handleRedirectAfterLogin = () => {
  const redirectUrl = localStorage.getItem('redirectUrl') || '/';
  localStorage.removeItem('redirectUrl');
  window.location.href = redirectUrl;
};

export const handleNavigateBack = () => {
  window.history.back();
};
