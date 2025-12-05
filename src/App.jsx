import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { useEffect } from 'react';
import { AnimatePresence } from "framer-motion";

import Nav from "./components/layout/Navbar.jsx";
import Login from "./pages/public/Login.jsx";
import FAQ from "./pages/public/FAQ.jsx";
import COC from "./pages/public/COC.jsx";
import Home from "./pages/public/Home.jsx";
import Registration from "./pages/public/Registration.jsx";
import Secretariat from "./pages/public/Secretariat.jsx";
import PageWrapper from "./components/layout/PageWrapper.jsx";
import DelegatesHome from "./pages/delegates/DelegatesHome.jsx";
import AmendmentsDelegates from "./components/delegates/AmendmentsDelegatesOld.jsx";
import Missing from "./pages/public/Missing.jsx";
import Resolutions from "./components/delegates/AmendmentsDelegatesOld.jsx";
import Overview from "./components/delegates/Overview.jsx";
import AdminHome from "./pages/admin/AdminHome.jsx";
import GetCountries from "./components/admin/GetCountries.jsx";
import AuthRedirect from "./components/util/AuthRedirect.jsx";
import Unauthorized from "./pages/public/Unauthorized.jsx";
import PersistentLogin from './components/util/PersistentLogin.jsx';
import Projection_Dashboard from "./components/admin/Projection/Projection_Dashboard.jsx";  
import ResolutionsAdmin from './pages/admin/ResolutionsAdmin.jsx';
import Footer from './components/layout/Footer.jsx';
import ScrollToTop from './components/layout/ScrollToTop.jsx';
import useStore from './contexts/store.js'

function App() {

  const setLogged = useStore((state)=>state.setLogged)

  useEffect(()=>{
    const onStorage = ()=>{
      if (!localStorage.getItem("Logged")){
        setLogged(false)
      }
      else if (localStorage.getItem("Logged")==='true'){
        setLogged(true)
      }
    }
      window.addEventListener("storage", onStorage)
      return ()=>{window.removeEventListener("storage", onStorage)}
  }, []);

  const location = useLocation();

  return (<>
      <ScrollToTop />
      <Nav />

      <AnimatePresence mode="wait">    {/*basically event listener that lets us animate exit and enter transitions to happen one after the other via pagewrapper */}
          <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/Login" element={<PageWrapper><Login /></PageWrapper>} />
          <Route path="/FAQ" element={<PageWrapper><FAQ /></PageWrapper>} />
          <Route path="/COC" element={<PageWrapper><COC /></PageWrapper>} />
          <Route path="/Registration" element={<PageWrapper><Registration /></PageWrapper>} />
          <Route element ={<PersistentLogin/>} >
            <Route path="/Secretariat" element={<PageWrapper><Secretariat /></PageWrapper>} />
          </Route>
          <Route path="/Unauthorized" element={<PageWrapper><Unauthorized /></PageWrapper>} />

          {/* Private Routes */}

          <Route element = {<PersistentLogin/>}>
            <Route element={<AuthRedirect allowedRole={'admin'} />}>
              <Route path="/Admin/Dashboard" element={<PageWrapper><AdminHome /></PageWrapper>} >
                <Route path="resolutions" element={<PageWrapper><ResolutionsAdmin /></PageWrapper>} />
                <Route path="projection" element={<PageWrapper><Projection_Dashboard /></PageWrapper>} />
                <Route path="getCountries" element={<PageWrapper><GetCountries /></PageWrapper>} />
              </Route>
            </Route>

            <Route element={<AuthRedirect allowedRole={'member'} />}>
              <Route path="/Delegates/Dashboard" element={<PageWrapper><DelegatesHome /></PageWrapper>}>
                <Route path="resolutions" element={<PageWrapper><Resolutions /></PageWrapper>} />
                <Route path="overview" element={<PageWrapper><Overview /></PageWrapper>} />
                <Route path="amendments" element={<PageWrapper><AmendmentsDelegates /></PageWrapper>} />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<PageWrapper><Missing /></PageWrapper>} />
        </Routes>
      </AnimatePresence>

      <Footer/>

  </>);
}

export default App;