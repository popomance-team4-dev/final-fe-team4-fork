import { Outlet } from 'react-router-dom';

import { NavSidebar } from '@/components/navigation/NavSidebar';

const NavbarLayout = () => {
  return (
    <div className="flex justify-center bg-white min-h-screen">
      <div className="flex w-full max-w-[1440px]">
        <NavSidebar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default NavbarLayout;
