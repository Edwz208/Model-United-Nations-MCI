import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect} from 'react';
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
import Resolutions from "./components/delegates/Amendments.jsx";
import Overview from "./components/delegates/Overview.jsx";
import AdminDash from "./components/admin/Admin.jsx";
import GetCountries from "./components/admin/GetCountries.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import Unauthorized from "./components/Unauthorized.jsx";
import PersistentLogin from './components/PersistentLogin.jsx';
import Projection_Dashboard from "./components/admin/Projection/Projection_Dashboard.jsx";  
import AdminHome from "./components/admin/AdminHome.jsx";
import ResolutionsAdmin from './components/admin/Resolutions.jsx'
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import useStore from './store/store.js'
const roleList = {
  member: '2007',
  admin: '4015',
};

function AnimatedRoutes() {
  const setLogged = useStore((state)=>state.setLogged)
  useEffect(()=>{
    
    const onStorage = ()=>{
      console.log(localStorage.getItem("Logged"))
      if (!localStorage.getItem("Logged")){
        setLogged(false)
      }
      else if (localStorage.getItem("Logged")==='true'){
        console.log("set Logged to true")
        setLogged(true) // the actual value is always a string
      }
    }
      window.addEventListener("storage", onStorage)
      return ()=>{window.removeEventListener("storage", onStorage)}
  }, []);


  const location = useLocation();
  {/* lets us animate exit and enter transitions to happen one after the other via pagewrapper */}
return (
  <AnimatePresence mode="wait">  
      <Routes location={location} key={location.pathname}>
      {/* Public Routes */}
      <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/Login" element={<PageWrapper><Login /></PageWrapper>} />
      <Route path="/FAQ" element={<PageWrapper><FAQ /></PageWrapper>} />
      <Route path="/COC" element={<PageWrapper><COC /></PageWrapper>} />
      <Route path="/Registration" element={<PageWrapper><Registration /></PageWrapper>} />
      <Route path="/Secretariat" element={<PageWrapper><Secretariat /></PageWrapper>} />
      <Route path="/Unauthorized" element={<PageWrapper><Unauthorized /></PageWrapper>} />

      {/* Private Routes */}

      <Route element = {<PersistentLogin/>}>
        <Route element={<RequireAuth allowedRoles={[roleList.admin]} />}>
          <Route path="/Admin/Dashboard" element={<PageWrapper><AdminDash /></PageWrapper>} >
            <Route index element={<AdminHome />} /> 
            <Route path="home" element={<PageWrapper><AdminHome /></PageWrapper>} />
            <Route path="resolutions" element={<PageWrapper><ResolutionsAdmin /></PageWrapper>} />
            <Route path="projection" element={<PageWrapper><Projection_Dashboard /></PageWrapper>} />
            <Route path="getCountries" element={<PageWrapper><GetCountries /></PageWrapper>} />
          </Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={[roleList.member]} />}>
          <Route path="/Delegates/Dashboard" element={<PageWrapper><Dashboard /></PageWrapper>}>
            <Route index element={<DashboardHome />} /> 
            <Route path="resolutions" element={<PageWrapper><Resolutions /></PageWrapper>} />
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
      <ScrollToTop />
      <div style={{ background: "#282832" }}>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Cabin:ital,wght@0,400..700;1,400..700&display=swap');
        </style>
        <Nav />
        <AnimatedRoutes />
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;