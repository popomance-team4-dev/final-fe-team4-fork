import { Outlet } from 'react-router-dom';

import { NavSidebar } from '@/components/sidebar/NavSidebar';

const NavSidebarLayout = () => {
  return (
    <div className="flex justify-center bg-white min-h-screen">
      <div className="flex w-full max-w-[1440px]">
        <NavSidebar />
        <main className="flex-1 max-w-full w-full h-screen overflow-y-auto">
          <div className="max-w-[1336px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default NavSidebarLayout;
