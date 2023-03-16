import {useEffect, useState} from "react";
import logo from "../../img/logo.svg";
import cart from "../../img/cart.svg";
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../Button";

function Header() {

  let themeFromLocalStorage = localStorage.getItem('theme');

  useEffect(() => {
    themeFromLocalStorage === 'dark'
        ? document.body.classList.add('themeDark')
        : document.body.classList.remove('themeDark')
    // eslint-disable-next-line
  }, [])

  const state = useSelector((state) => state);
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(themeFromLocalStorage !== null ? themeFromLocalStorage : 'light');

  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const clickHandler = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const switchTheme = () => {
    document.body.classList.remove('themeDark');
    setTheme((prev) => {
      if(prev === 'light'){
        document.body.classList.add('themeDark');
        localStorage.setItem('theme', 'dark');
        return 'dark'
      }else{
        localStorage.setItem('theme', 'light');
        return 'light'
      }
    })
  }

  return (
    <header className={`header ${isOpen && 'header--active'}`}>

      <div className="top">
        <div className="container">
          <div className="header__wrap">
            <p className="header__text">
              We're open and available for takeaway & delivery.
            </p>
            <Link to="/menu" className="header__btn">Order Now</Link>
            <span className={`theme-switcher ${theme === 'dark' ? 'themeDark' : null}`} onClick={() => switchTheme()}>
              <span className="theme-switcher__dot"></span>
            </span>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="bottom">
          <div className="header__logo">
            <Link to="/" className="logo"><img src={logo} alt="Logo" /></Link>
          </div>
          <nav className="header__nav">
            <div className="nav__burger" onClick={() => clickHandler()}>
              <span className="burger__line line-1"></span>
              <span className="burger__line line-2"></span>
              <span className="burger__line line-3"></span>
            </div>
            <ul className="nav__list">
              {!isAuthenticated
                ? <li className="nav__item"><Button modificator={""} text={"Log In"} onClick={() => loginWithRedirect()}></Button></li>
                : <>
                    <li className="nav__item">
                      <NavLink to="/" className={({ isActive }) => isActive ? "nav-link nav-link--active" : "nav-link"} onClick={() => closeMenu()}>
                          Home
                      </NavLink>
                    </li>
                    <li className="nav__item">
                      <NavLink to="/menu" className={({ isActive }) => isActive ? "nav-link nav-link--active" : "nav-link"} onClick={() => closeMenu()}>
                        Menu
                      </NavLink>
                    </li>
                    <li className="nav__item">
                      <NavLink to="/company" className={({ isActive }) => isActive ? "nav-link nav-link--active" : "nav-link"} onClick={() => closeMenu()}>
                        Company
                      </NavLink>
                    </li>
                    <li className="nav__item">
                      <NavLink to="/faq" className={({ isActive }) => isActive ? "nav-link nav-link--active" : "nav-link"} onClick={() => closeMenu()}>
                        FAQ
                      </NavLink>
                    </li>
                    <li className="nav__item">
                      <NavLink to="/contacts" className={({ isActive }) => isActive ? "nav-link nav-link--active" : "nav-link"} onClick={() => closeMenu()}>
                        Contacts
                      </NavLink>
                    </li>
                    <li className="nav__item">
                      <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-link nav-link--active" : "nav-link"} onClick={() => closeMenu()}>
                        Profile
                      </NavLink>
                    </li>
                    <li className="nav__item nav__item--cart">
                      <Link to="/cart" className="nav-link nav-link--cart" onClick={() => closeMenu()}>
                        <img src={cart} alt="Cart" />
                        {state.cart.length > 0
                            ? <div className="card__badge">{state.cart.reduce((acc, num) => acc + Number(num.count), 0)}</div>
                            : null
                        }
                      </Link>
                    </li>
                </>
              }
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
