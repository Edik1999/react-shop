import React from 'react';
import Home from './pages/Home';
import './styles/index.sass';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import {Routes, Route, Navigate} from 'react-router-dom';
import {Company} from './pages/Company';
import {Contacts} from './pages/Contacts';
import {FAQ} from './pages/FAQ';
import {Cart} from './pages/Cart';
import {Fullmenu} from './pages/Fullmenu';
import {Profile} from "./pages/Profile";

function App() {
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
