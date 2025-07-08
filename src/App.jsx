import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Nav from "./components/Navbar.jsx";
import Login from "./components/Login.jsx";
import FAQ from "./components/FAQ.jsx";
import COC from "./components/COC.jsx";
import Home from "./components/Home.jsx";
import Registration from "./components/Registration.jsx";
import Secretariat from "./components/Secretariat.jsx";
import PageWrapper from "./components/PageWrapper.jsx";
import DashboardHome from "./components/delegates/DashboardHome.jsx";
import Dashboard from "./components/delegates/Dashboard.jsx";
import Missing from "./components/Missing.jsx";
import Amendments from "./components/delegates/Amendments.jsx";
import Overview from "./components/delegates/Overview.jsx";
import AdminDash from "./components/admin/Admin.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import Unauthorized from "./components/Unauthorized.jsx";
import PersistentLogin from './components/PersistentLogin.jsx';
import LoginWrapper from './components/LoginWrapper.jsx';
import Projection_Dashboard from "./components/admin/Projection/Projection_Dashboard.jsx";  
import AdminHome from "./components/admin/AdminHome.jsx";
import ResolutionsAdmin from './components/admin/Resolutions.jsx'

const roleList = {
  member: 2007,
  admin: 4015,
};

function AnimatedRoutes() {
  const location = useLocation();

return (
  <AnimatePresence mode="wait">
    <Routes location={location} key={location.pathname}>
      {/* Public Routes */}
      <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
      <Route element={<LoginWrapper/>}>
        <Route path="/Login" element={<PageWrapper><Login /></PageWrapper>} />
      </Route>
      <Route path="/FAQ" element={<PageWrapper><FAQ /></PageWrapper>} />
      <Route path="/COC" element={<PageWrapper><COC /></PageWrapper>} />
      <Route path="/Registration" element={<PageWrapper><Registration /></PageWrapper>} />
      <Route path="/Secretariat" element={<PageWrapper><Secretariat /></PageWrapper>} />
      <Route path="/Unauthorized" element={<PageWrapper><Unauthorized /></PageWrapper>} />

      {/* Private Routes */}

      <Route element = {<PersistentLogin/>}>
        <Route element={<RequireAuth allowedRoles={[roleList.admin]} />}>
          <Route path="/Admin/Dashboard" element={<PageWrapper><AdminDash /></PageWrapper>} >
            <Route path="home" element={<PageWrapper><AdminHome /></PageWrapper>} />
            <Route path="resolutions" element={<PageWrapper><ResolutionsAdmin /></PageWrapper>} />
            <Route path="projection" element={<PageWrapper><Projection_Dashboard /></PageWrapper>} />

          </Route>
        </Route>
      </Route>

      <Route element ={<PersistentLogin/>}>
        <Route element={<RequireAuth allowedRoles={[roleList.member]} />}>
          <Route path="/Delegates/Dashboard" element={<PageWrapper><Dashboard /></PageWrapper>}>
            <Route index element={<DashboardHome />} /> 
            <Route path="amendments" element={<PageWrapper><Amendments /></PageWrapper>} />
            <Route path="overview" element={<PageWrapper><Overview /></PageWrapper>} />
            <Route path="home" element={<PageWrapper><DashboardHome /></PageWrapper>} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<PageWrapper><Missing /></PageWrapper>} />
    </Routes>
  </AnimatePresence>
);
}

function App() {
  return (
    <BrowserRouter>
      <div style={{ background: "#282832" }}>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Cabin:ital,wght@0,400..700;1,400..700&display=swap');
        </style>
        <Nav />
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;