// Layout.js

import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../../admin/SideBar';
import Header from '../../admin/Header';
import SettingsContent from '../../admin/Settings/SettingsContent';

const Layout = () => {
  const location = useLocation();
  const isAccountSection = location.pathname.startsWith('/settings');

  return (
    <div className="flex flex-col justify-center bg-white">
      <div className="flex flex-col justify-center px-3.5 py-4 w-full bg-zinc-900 max-md:max-w-full">
        <div className="px-3 pt-1.5 pb-3.5 bg-zinc-800 rounded-[15px] max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <Sidebar/>
            <div className="flex flex-col ml-5 w-[79%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow pt-12 pb-4 pl-8 w-full bg-zinc-900 rounded-[15px] max-md:mt-4 max-md:max-w-full">
                <Header />
                {isAccountSection ? <SettingsContent /> : <Outlet />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Layout;
