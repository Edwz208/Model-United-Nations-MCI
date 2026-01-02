import { Link, Outlet } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar.jsx';

function DelegatesLayout() {
    return (
    <div className='bg-red-500 flex flex-row flex-1'>
    <Sidebar></Sidebar>
    <div className='flex flex-col flex-1 items-center justify-center bg-blue-500'>
      <div>h1</div>
      <Outlet />
    </div>
    </div>
    );
}

export default DelegatesLayout;