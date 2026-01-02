import { Link, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return ( 
    <div className="w-full flex flex-1 justify-center pt-20">
      <div className="w-[70%] shadow-lg backdrop-blur-md border border-border">
        <nav className="flex w-full justify-around gap-6 border-b border-black/10 bg-gray-50 px-6 py-4">
          <Link to="/Admin/Dashboard" className='text-md text-text-primary hover:underline'>Home</Link>
          <Link to="/Admin/Dashboard/resolutions" className="text-md text-text-primary hover:underline">Resolutions</Link>
          <Link to="/Admin/Dashboard/projection" className='text-md text-text-primary hover:underline'>Projection Dashboard</Link>
          <Link to="/Admin/Dashboard/countries" className='text-md text-text-primary hover:underline'>Countries</Link>
        </nav>
        
        <main className="p-6">
          <Outlet/>
        </main>
      </div>
    </div>
    )
}

export default AdminLayout;