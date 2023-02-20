import React from "react";
import logo from "../../img/logo.svg";
import cart from "../../img/cart.svg";
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from "react-redux";


function Header() {

  const state = useSelector((state) => state);

  return (
    <header className="header">

      <div className="top">
        <div className="container">
          <div className="header__wrap">
            <p className="header__text">
              We're open and available for takeaway & delivery.
            </p>
            <Link to="/menu" className="header__btn">Order Now</Link>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="bottom">
          <div className="header__logo">
            <Link to="/"><img src={logo} alt="Logo" /></Link>
          </div>
          <nav className="header__nav">
            <ul className="nav__list">
              <li className="nav__item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "nav-link nav-link--active" : "nav-link"
                  }>
                  Home
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/menu"
                  className={({ isActive }) =>
                    isActive ? "nav-link nav-link--active" : "nav-link"
                  }>
                  Menu
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/company"
                  className={({ isActive }) =>
                    isActive ? "nav-link nav-link--active" : "nav-link"
                  }>
                  Company
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/faq"
                  className={({ isActive }) =>
                    isActive ? "nav-link nav-link--active" : "nav-link"
                  }>
                  FAQ
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/contacts"
                  className={({ isActive }) =>
                    isActive ? "nav-link nav-link--active" : "nav-link"
                  }>
                  Contacts
                </NavLink>
              </li>
              <Link to="/cart" className="nav-link cart">
                <li className="nav__item">
                  <img src={cart} alt="Cart" />
                  {state.cart.length > 0 
                    ? <div className="card__badge">{state.cart.reduce((acc, num) => acc + Number(num.count), 0)}</div>
                    : null
                  }
                </li>
              </Link>
            </ul>
            <input className="checkbox" type="checkbox" name="" id=""/>
              <div className="nav__burger">
                <span className="burger__line line-1"></span>
                <span className="burger__line line-2"></span>
                <span className="burger__line line-3"></span>
              </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
