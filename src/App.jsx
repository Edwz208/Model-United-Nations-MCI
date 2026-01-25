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
import Secretariat from "./pages/public/Secretariat.jsx";

import PageWrapper from "./components/layout/PageWrapper.jsx";
import DelegatesHome from "./pages/delegates/DelegatesLayout.jsx";
import DelegatesDisplayCountries from './components/delegates/DisplayCountries.jsx'
import AmendmentsDelegates from "./components/delegates/AmendmentsDelegatesOld.jsx";
import Missing from "./pages/public/Missing.jsx";
import Resolutions from "./components/delegates/AmendmentsDelegatesOld.jsx";
import Overview from "./components/delegates/Overview.jsx";

import AuthRedirect from "./components/util/AuthRedirect.jsx";
import Unauthorized from "./pages/public/Unauthorized.jsx";
import PersistentLogin from './components/util/PersistentLogin.jsx';
import Footer from './components/layout/Footer.jsx';
import useStore from './contexts/store.js'

import AdminLayout from "./pages/admin/Layout.jsx";
import AdminHomePage from './pages/admin/Home.jsx';
import AdminCountries from "./pages/admin/Countries.jsx";
import AdminResolutions from './pages/admin/Resolutions.jsx';
import AdminProjectionDashboard from "./components/admin/ProjectionDashboard.jsx";
import ReviewAmendments from './pages/admin/ReviewAmendments.jsx'

import CouncilParamWrapper from "./components/util/CouncilParamWrapper.jsx";

import Screen from './pages/public/Screen.jsx';

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
  }, [setLogged]);

  const location = useLocation();
 // set to flex and flex-col to make footer at bottom regardless of height of main
  return (<div className="min-h-[120vh] flex flex-col"> 
      <Nav />
      <main className='flex flex-col flex-1 pt-13 pb-0.5'> {/* better than calculating nav height, grows to fit screen and footer will display on smaller ones instantly*/}
      <AnimatePresence mode="wait">    {/*basically event listener that lets us animate exit and enter transitions to happen one after the other via pagewrapper */}
          <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/Login" element={<PageWrapper><Login /></PageWrapper>} />
          <Route path="/FAQ" element={<PageWrapper><FAQ /></PageWrapper>} />
          <Route path="/COC" element={<PageWrapper><COC /></PageWrapper>} />
          <Route element ={<PersistentLogin/>} >
            <Route path="/Secretariat" element={<PageWrapper><Secretariat /></PageWrapper>} />
          </Route>
          <Route path="/Council/:councilId/Screen" element={<PageWrapper><Screen /></PageWrapper>} />
          <Route path="/Unauthorized" element={<PageWrapper><Unauthorized /></PageWrapper>} />

          {/* Private Routes */}

          <Route element = {<PersistentLogin/>}>
            <Route element={<AuthRedirect allowedRole={'admin'} />}>
              <Route path="/Admin/Dashboard" element={<PageWrapper><AdminLayout /></PageWrapper>} >
                <Route index element={<PageWrapper><AdminHomePage /></PageWrapper>} />
                <Route path="resolutions" element={<PageWrapper><AdminResolutions /></PageWrapper>} />
                <Route path="projection" element={<PageWrapper><AdminProjectionDashboard /></PageWrapper>} />
                <Route path="countries" element={<PageWrapper><AdminCountries /></PageWrapper>} />
                <Route path="Council/:councilId/:councilName" element={<PageWrapper><CouncilParamWrapper/></PageWrapper>}>
                  <Route path="resolutions" element={<PageWrapper><AdminResolutions /></PageWrapper>} />
                  <Route path="projection" element={<PageWrapper><AdminProjectionDashboard /></PageWrapper>} />
                  <Route path="countries" element={<PageWrapper><AdminCountries /></PageWrapper>} />
                  <Route path="review" element={<PageWrapper><ReviewAmendments /></PageWrapper>} />
                </Route>
              </Route>
            </Route>

            <Route element={<AuthRedirect allowedRole={'member'} />}>
              <Route path="/Delegates/Dashboard" element={<PageWrapper><DelegatesHome /></PageWrapper>}>
                <Route path="resolutions" element={<PageWrapper><Resolutions /></PageWrapper>} />
                <Route path="overview" element={<PageWrapper><Overview /></PageWrapper>} />
                <Route path="amendments" element={<PageWrapper><AmendmentsDelegates /></PageWrapper>} />
                <Route path="countries" element={<PageWrapper><DelegatesDisplayCountries /></PageWrapper>} />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<PageWrapper><Missing /></PageWrapper>} />
        </Routes>
      </AnimatePresence>

      </main>
      <Footer className=''/>
  </div>);
}

export default App;