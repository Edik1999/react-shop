import React, {useEffect} from 'react';
import Home from './pages/Home';
import './styles/index.sass';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import {useLocation, Routes, Route, Navigate} from 'react-router-dom';
import {Company} from './pages/Company';
import {Contacts} from './pages/Contacts';
import {FAQ} from './pages/FAQ';
import {Cart} from './pages/Cart';
import {Fullmenu} from './pages/Fullmenu';
import {Profile} from "./pages/Profile";

function App() {

    let location = useLocation();

    useEffect(() => {
        window.scrollTo(0,0);
    }, [location.pathname])

  return (
    <>
      <Header></Header>
      <div className="container container--fluid">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/company" element={<Company/>} />
          <Route path="/contacts" element={<Contacts/>} />
          <Route path="/faq" element={<FAQ/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/menu" element={<Fullmenu/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="*" element={<Navigate to="/" replace />}/>
        </Routes>
      </div>
      <Footer></Footer>
    </>
  );
}

export default App;
