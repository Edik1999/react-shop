import './styles/global.sass';

import {useEffect, useState} from 'react';
import useAppInit from "./hooks/useAppInit";
import {useLocation, Routes, Route, Navigate} from 'react-router-dom';

import Home from './pages/Home';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Loader from "./components/Loader";
import {Company} from './pages/Company';
import {Contacts} from './pages/Contacts';
import {FAQ} from './pages/FAQ';
import {Cart} from './pages/Cart';
import {Menu} from './pages/Menu';
import {Profile} from "./pages/Profile";
import {Firestore} from "firebase/firestore";

function App({db}: { db: Firestore }) {

    const [loading, setLoading] = useState(true)

    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname])

    useAppInit(db, setLoading);

    return (
        <>
          <Header></Header>
          {loading && <Loader></Loader>}
          <div className="container container--fluid">
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/company" element={<Company/>} />
              <Route path="/contacts" element={<Contacts db={db}/>} />
              <Route path="/faq" element={<FAQ/>} />
              <Route path="/cart" element={<Cart db={db}/>} />
              <Route path="/menu" element={<Menu/>} />
              <Route path="/profile" element={<Profile db={db}/>} />
              <Route path="*" element={<Navigate to="/" replace />}/>
            </Routes>
          </div>
          <Footer></Footer>
        </>
    );
}

export default App;
