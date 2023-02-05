import React from 'react'
import Button from '../components/Button'
import logo from '../img/logo.svg'
import cart from '../img/cart.svg'


function Home() {
  return (
    <>
      <body>
        <header>
          <div className="top">
            <p className="header__text">We're open and available for takeaway & delivery.</p>
            <button className="header__btn">Order Now</button>
          </div>
          <div className="bottom">
            <div className="header__logo"><img src={logo} alt="Logo"/></div>
            <nav className="header__nav">
              <ul className="nav__list">
                <li className="nav__item"><a href="#">Home</a></li>
                <li className="nav__item"><a href="#">Order</a></li>
                <li className="nav__item"><a href="#">Company</a></li>
                <li className="nav__item"><a href="#">FAQ</a></li>
                <li className="nav__item"><a href="#">Contacts</a></li>
                <li className="nav__item"><a href="#" className="nav-link"><img src={cart} alt="Cart" /></a></li>
              </ul>
            </nav>
          </div>        
        </header>

        <section className="order">
          <div className="order__left">
            <h1 className="section__title">Beautiful food & takeaway, delivered to your door.</h1>
            <p className="section__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500.</p>
            <button className="order__btn">Place an Order</button>
            <img className="order__img" src="#" />
            <p className="order__text"></p>
          </div>
        </section>

        <section className="aboutus">
        </section>

        <section className="howitworks">
        </section>

        <section className="menu">
        </section>

        <section className="faq">
        </section>

        <section className="contacts">
        </section>

        <section className="support">
        </section>        
      </body>

      <footer>

      </footer>
    </>
  )
}

export default Home