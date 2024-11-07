import LoginComponent from '@/components/login/loginbox';
import LoginLogo from '@/images/loginlogo.svg';

const LoginPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F7F7F7] overflow-x-hidden">
      <div className="relative w-[1440px] h-[1024px] flex mx-auto">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${LoginLogo})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div className="w-1/2" />
        <div className="relative z-10 w-1/2 h-full flex items-center justify-center">
          <LoginComponent />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
