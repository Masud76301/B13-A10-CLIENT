import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import { DashboardSideBar } from '@/components/dashboard/DashboardSideBar';
import React from 'react';

const DashboardLayout = ({children}) => {
    return (
        <div className='flex min-h-screen'>
             <DashboardSideBar/>
             
            <div className='flex-1'>
                {/* <div className='border  w-full h-18'>Navbar</div> */}
                <DashboardNavbar/>
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;