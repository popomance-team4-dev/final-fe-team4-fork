import { Outlet } from 'react-router-dom';

import { NavSidebar } from '../NavSidebar';

const NavbarLayout = () => {
  return (
    <>
      <div className="flex min-h-screen bg-gray-50">
        <NavSidebar />
        <main className="flex-1 p-3">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default NavbarLayout;
