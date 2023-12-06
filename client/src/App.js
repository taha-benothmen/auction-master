import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar.js';
import Navbar1 from './components/Navbar1.js';

import Notifications from './components/Notifications';
import Listings from './components/Listings';
import Profile from './components/Profile';
import HousingInfo from './components/HousingInfo';
import MessageBoard from './components/MessageBoard';
import SingleListing from './components/SingleListing';
import Schools from './components/Schools';
import { ChakraProvider } from '@chakra-ui/react';
import SingleResidence from './components/SingleResidence';
import Error from './components/Error';
import SearchResidences from './components/SearchResidences';
import Contact from './components/Contact.js'
import Verfilog from './components/Veriflog.js'
import Admin from './components/Admin';
import Adminlog from './Dashbord_Admin/Adminlog.js';
import MangThem from './Dashbord_Admin/MangThem.js';
import NavbarDash from './Dashbord_Admin/NavbarDash.js';
import AddRH from './Dashbord_Admin/AddRH.js';
import MangmentRH from './Dashbord_Admin/MangmentRH.js';
import Homeadmin from './Dashbord_Admin/Homeadmin.js';
import RHlog from './Dashbord_RH/RHlog.js';
import NavbarRH from './Dashbord_RH/NavbarRH.js';
import HomeRH from './Dashbord_RH/HomeRH.js';
import ValidateAuctions from './Dashbord_RH/ValidateAuctions.js';
import ValidateUsers from './Dashbord_RH/ValidateUsers.js';


function App() {
  const location = useLocation();
  const [forceNavbarRerender, setForceNavbarRerender] = useState(false);

  useEffect(() => {
    setForceNavbarRerender(true);
    return () => {
      setForceNavbarRerender(false);
    };
  }, [location]);
  const isHomeAdminPage = location.pathname.includes('/homeadmin');
  const isAdminLog = location.pathname.includes('/adminlog');
  const isHomeRHPage = location.pathname.includes('/homerh');
  const isRHLog = location.pathname.includes('/rhlog');
  const isAddRH = location.pathname.includes('/addrh');
  const isMangment = location.pathname.includes('/mangmentrh');
  const isThem = location.pathname.includes('/mangthem');
  const isUsers = location.pathname.includes('/validateusers');
  const isActions = location.pathname.includes('/validateauctions');
  const isLogin = location.pathname.includes('/');
  const isVerif = location.pathname.includes('/veriflog')

  let navbarComponent = null;

  if (isHomeAdminPage || isAdminLog  || isAddRH  || isMangment || isThem) {
    navbarComponent = <NavbarDash />;
  } else if (isHomeRHPage || isRHLog || isUsers || isActions) {
    navbarComponent = <NavbarRH />;
  } else if (isVerif) {
    navbarComponent = <Navbar1 />;
  } 
  else {
    navbarComponent= <Navbar/>;
  }
  return (
    <ChakraProvider>
      {navbarComponent}

       <Routes>
        <Route path="/" element={<Login />} exact />
        <Route path="/veriflog" element={<Verfilog />} exact />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/housinginfo/:residence" element={<SingleResidence />} />
        <Route path="/housinginfo" element={<HousingInfo />} />
        <Route path="/listings/:id" element={<SingleListing />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/messageboard" element={<MessageBoard />} />
        <Route path="/schools" element={<Schools />} />
        <Route path="/searchresidences" element={<SearchResidences />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/*" element={<Error />} />
        <Route path='/adminlog' element={<Adminlog/>}></Route>
        <Route path='/homeadmin' element={<Homeadmin/>}></Route>
        <Route path='/rhlog' element={<RHlog/>}></Route>
        <Route path='/homerh' element={<HomeRH/>}></Route>
        <Route path='/addrh' element={<AddRH/>}></Route>
        <Route path='/mangmentrh' element={<MangmentRH/>}></Route>
        <Route path='/mangthem' element={<MangThem/>}></Route>
        <Route path='/validateauctions' element={<ValidateAuctions/>}></Route>
        <Route path='/validateusers' element={<ValidateUsers/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>


      </Routes>
    
    </ChakraProvider>
    
  );
}

export default App;
