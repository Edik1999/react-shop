import React from 'react'
import Card from "../components/Card"

function Menu() {
  return (
    <>
      <h2 className="section__title menu__title text-color">Browse our menu</h2>
            <p className="menu__text">Use our menu to place an order online, or phone our store to place a pickup order. Fast and fresh food.</p>
            <div className="menu__btn">
              <button className="btn__burger">Burgers</button>
              <button className="btn__slider">Sides</button>
              <button className="btn__drinks">Drinks</button>
              </div>
              <ul className='card__wrap'>
                {/* <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card> */}
              </ul>
      
      
    </>
  )
}

export default Menu