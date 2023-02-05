import React from "react";
import logo from "../../img/logo.svg";
import cart from "../../img/cart.svg";
import { NavLink, Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <div className="top">
        <p className="header__text">
          We're open and available for takeaway & delivery.
        </p>
        <Link to="/order" className="header__btn">Order Now</Link>
      </div>
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
                to="/order"
                className={({ isActive }) =>
                  isActive ? "nav-link nav-link--active" : "nav-link"
                }>
                  Order
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
            <Link to="/cart" className="nav-link">
              <li className="nav__item">
                <img src={cart} alt="Cart" />
              </li>
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
