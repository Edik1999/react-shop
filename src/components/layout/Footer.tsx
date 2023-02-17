import React from 'react'
import logo from "../../img/logo.svg";
import twitter from "../../img/twitter.svg";
import instagram from "../../img/instagram.svg";
import youtube from "../../img/youtube.svg";
import { Link } from 'react-router-dom';

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
              <li className="company__item company-title">Company</li>
              <li className="company__item">
                <Link to="/" className={"nav-link"}>Home</Link>
              </li>
              <li className="company__item">
                <Link to="/menu" className={"nav-link"}>Menu</Link>
              </li>
              <li className="company__item">
                <Link to="/faq" className={"nav-link"}>FAQ</Link>
              </li>
              <li className="company__item">
                <Link to="/contacts" className={"nav-link"}>Contact</Link>
              </li>
            </ul>
            <ul className="template__list">
              <li className="template__item template-title">Template</li>
              <li className="template__item">
                <Link to="/" className={"nav-link"}>Style Guide</Link>
              </li>
              <li className="template__item">
                <Link to="/" className={"nav-link"}>Changelog</Link>
              </li>
              <li className="template__item">
                <Link to="/" className={"nav-link"}>Licence</Link>
              </li>
              <li className="template__item">
                <Link to="/" className={"nav-link"}>Webflow University</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__link">
          <p className="link__text">Built by: <Link to="https://github.com/Edik1999"><span className="link__dev text-color">Edik1999</span></Link> and <Link to="https://github.com/BalVan18"><span className="link__dev text-color">BalVan18</span></Link></p>
          <ul className="link__list">
            <Link to="https://www.instagram.com/"><li className="link__item link-instagram"><img src={instagram} alt="Instagram" /></li></Link>
            <Link to="https://twitter.com/"><li className="link__item link-twitter"><img src={twitter} alt="twitter" /></li></Link>
            <Link to="https://www.youtube.com/"><li className="link__item link-youtube"><img src={youtube} alt="youtube" /></li></Link>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer