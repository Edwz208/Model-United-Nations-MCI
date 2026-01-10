import { Link, Outlet, useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button';
import { useParams } from 'react-router-dom';

const AdminLayout = () => {
  const { councilId } = useParams()
  console.log(councilId)
  const councilScoped = Number.isFinite(Number(councilId))
  const navigate = useNavigate();

  return (
  <div className='w-full pt-20'>
    <div className='mx-auto w-[70%]'>
      {councilScoped && <Button onClick={() => navigate('/Admin/Dashboard')}>Back</Button>}
      <div className="shadow-lg backdrop-blur-md border border-border">
        <nav className="flex w-full justify-around gap-6 border-b border-black/10 bg-gray-50 px-6 py-4">
          {!councilScoped ? <><Link to="/Admin/Dashboard" className='text-md text-text-primary hover:underline'>Home</Link>
          <Link to="/Admin/Dashboard/resolutions" className="text-md text-text-primary hover:underline">Resolutions</Link>
          <Link to="/Admin/Dashboard/countries" className='text-md text-text-primary hover:underline'>Countries</Link></> :
          <>
          <Link to= {`/Admin/Dashboard/Council/${councilId}/resolutions`} className="text-md text-text-primary hover:underline">Resolutions</Link>
          <Link to={`/Admin/Dashboard/Council/${councilId}/projection`} className='text-md text-text-primary hover:underline'>Projection Dashboard</Link>
          <Link to={`/Admin/Dashboard/Council/${councilId}/countries`} className='text-md text-text-primary hover:underline'>Countries</Link>
          </>}
          
        </nav>
        
        <main className="p-6">
          <Outlet/>
        </main>
      </div>
    </div>
    </div>
)
}

export default AdminLayout;