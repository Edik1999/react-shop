import React from 'react'
import Button from '../components/Button'
import logo from '../img/logo.svg'

function Home() {
  return (
    <>
      <header>
        <div className="top">
          <p className="header__text">Мы открылись! Теперь доступна доставка и самовывоз</p>
          <button className="header__btn">Сделать заказ</button>
        </div>
        <div className="bottom">
          <div className="header__logo"><img src={logo}/></div>
          <nav className="header__nav">Глав</nav>
          <Button></Button>
        </div>        
      </header>

      <body>
        
      </body>

      <footer>

      </footer>
    </>
  )
}

export default Home