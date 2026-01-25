import { Link, Outlet, useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const AdminLayout = () => {
  const { councilId, councilName } = useParams()
  const isCouncilScoped = Number.isFinite(Number(councilId))
  const navigate = useNavigate();
  // council Param also in CouncilParamWrapper.jsx, used to pass the outletcontext to children like displaycountries.jsx when available
  
  useEffect(() => {
    if (councilId !== undefined && !isCouncilScoped) {
      navigate("/Admin/Dashboard", { replace: true })
    }
  }, [councilId, isCouncilScoped, navigate])

  return (
  <div className='w-full pt-20'>
    <div className='mx-auto w-[70%]'>
      <div className='flex justify-between mb-1'>
      {isCouncilScoped && <Button onClick={() => navigate('/Admin/Dashboard')}>Back</Button>}
      {isCouncilScoped && <Button disabled={true}>{councilName}</Button>}
      </div>
      <div className="shadow-lg backdrop-blur-md border border-border">
        <nav className="flex w-full justify-around gap-6 border-b border-black/10 bg-gray-50 px-6 py-4">
          {!isCouncilScoped ? <><Link to="/Admin/Dashboard" className='text-md text-text-primary hover:underline'>Home</Link>
          <Link to="/Admin/Dashboard/resolutions" className="text-md text-text-primary hover:underline">Resolutions</Link>
          <Link to="/Admin/Dashboard/countries" className='text-md text-text-primary hover:underline'>Countries</Link></> :
          <>
          <Link to= {`/Admin/Dashboard/Council/${councilId}/${councilName}/resolutions`} className="text-md text-text-primary hover:underline">Resolutions</Link>
          <Link to={`/Admin/Dashboard/Council/${councilId}/${councilName}/countries`} className='text-md text-text-primary hover:underline'>Countries</Link>
          <Link to={`/Admin/Dashboard/Council/${councilId}/${councilName}/review` } className='text-md text-text-primary hover:underline'>Review</Link>
          <Link to={`/Admin/Dashboard/Council/${councilId}/${councilName}/projection`} className='text-md text-text-primary hover:underline'>Projection Dashboard</Link>
          </>}
          
        </nav>
        
          <main className="p-6 flex-1 min-h-0 overflow-auto">
          {/* outlet does not affect styling with flex-grow bc its just a placeholder for nested routes */}
          <Outlet/> 
        </main>
      </div>
    </div>
    </div>
)
}

export default AdminLayout;