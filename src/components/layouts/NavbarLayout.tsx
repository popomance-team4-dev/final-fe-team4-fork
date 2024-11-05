import { Outlet } from 'react-router-dom';

import Navbar from './Navbar';

const NavbarLayout = () => {
  return (
    <>
      <div className="flex min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-1 ml-[240px] p-6">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default NavbarLayout;
