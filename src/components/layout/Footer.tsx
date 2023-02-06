import React from 'react'
import logo from "../../img/logo.svg";
import twitter from "../../img/twitter.svg";
import instagram from "../../img/instagram.svg";
import youtube from "../../img/youtube.svg";
import { NavLink, Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__container">
          <div className="footer__aside">
            <Link to="/"><img className="footer__logo" src={logo} alt="Logo" /></Link>
            <p className="footer__descr">Takeaway & Delivery template for small - medium businesses.</p>
          </div>
          <div className="footer__nav">
            <ul className="company__list">
              <li className="company__item">Company</li>
              <li className="company__item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "nav-link nav-link--active" : "nav-link"
                  }>
                  Home
                </NavLink>
              </li>
              <li className="company__item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "nav-link nav-link--active" : "nav-link"
                  }>
                  Order
                </NavLink>
              </li>
              <li className="company__item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "nav-link nav-link--active" : "nav-link"
                  }>
                  FAQ
                </NavLink>
              </li>
              <li className="company__item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "nav-link nav-link--active" : "nav-link"
                  }>
                  Contact
                </NavLink>
              </li>
            </ul>
            <ul className="template__list">
              <li className="template__item">Template</li>
              <li className="template__item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "nav-link nav-link--active" : "nav-link"
                  }>
                  Style Guide
                </NavLink>
              </li>
              <li className="template__item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "nav-link nav-link--active" : "nav-link"
                  }>
                  Changelog
                </NavLink>
              </li>
              <li className="template__item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "nav-link nav-link--active" : "nav-link"
                  }>
                  Licence
                </NavLink>
              </li>
              <li className="template__item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "nav-link nav-link--active" : "nav-link"
                  }>
                  Webflow University
                </NavLink>
              </li>
            </ul>
            <ul className="flowbase__list">
              <li className="flowbase__item">Flowbase</li>
              <li className="flowbase__item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "nav-link nav-link--active" : "nav-link"
                  }>
                  More Cloneables
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__link">
          <p className="link__descr">Built by <span className="text-color">Flowbase</span>. Powered by <span className="text-color">Webflow</span></p>
          <ul className="link__list">
            <Link to="/"><li className="link__item link-instagram"><img src={instagram} alt="Instagram" /></li></Link>
            <Link to="/"><li className="link__item link-twitter"><img src={twitter} alt="twitter" /></li></Link>
            <Link to="/"><li className="link__item link-youtube"><img src={youtube} alt="youtube" /></li></Link>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer