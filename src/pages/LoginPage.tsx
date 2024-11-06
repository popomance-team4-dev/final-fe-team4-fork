import LoginComponent from '@/components/login/loginbox';

const LoginPage = () => {
  return (
    <div className="flex w-full h-screen">
      {/* 왼쪽 이미지 영역 */}
      <div className="w-1/2 h-full bg-[#F7F7F7]">
        <img alt="Login Visual" className="w-full h-full object-cover" />
      </div>

      {/* 오른쪽 로그인 영역 */}
      <div className="w-1/2 h-full flex items-center justify-center bg-white">
        <LoginComponent />
      </div>
    </div>
  );
};

export default LoginPage;
