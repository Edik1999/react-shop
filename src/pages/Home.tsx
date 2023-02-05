import React from 'react'
import Button from '../components/Button'
import logo from '../img/logo.svg'
import { useGetGoodsQuery } from '../store/mockAPI/mockApi'

function Home() {

  const {isLoading, isError, data} = useGetGoodsQuery('');

  console.log(data)

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

      <footer>

      </footer>
    </>
  )
}

export default Home