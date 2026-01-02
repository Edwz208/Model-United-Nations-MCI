import { Link } from 'react-router-dom';
// for hamburger/ collapsible combine navbar and sidebar 
function Sidebar(){
    return (
    <nav className="flex flex-col pt-5 bg-purple-500 gap-5 px-5">
        <Link to="/Delegates/Dashboard">Home</Link>
        <Link to="/Delegates/Dashboard/resolutions">Resolutions</Link>
        <Link to="/Delegates/Dashboard/amendments">Amendments</Link>
        <Link to="/Delegates/Dashboard/overview">Overview</Link>

    </nav>
    )
}

export default Sidebar;