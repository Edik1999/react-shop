import React, { useEffect, useState } from "react";
import { useDebounce } from "../hooks/debounce";
import { useSelector, useDispatch } from "react-redux";
import { RootState, useAppDispatch } from "../store";
<<<<<<< HEAD
import Card from "../components/Card";
import Search from "../components/Search";
=======
import Card from '../components/Card';
import Button from '../components/Button';
>>>>>>> bb745f1d0a7a4c0950b8888a5df06b8b8199a26c

function Fullmenu() {
  const state = useSelector((state) => state);

  useEffect(() => {
    console.log(state.setGoods?.length)
    state.setGoods.map((el) => console.log(el));
  }, [])
  
  
 
  return (
<<<<<<< HEAD
    <>
      <h2 className={`section__title menu__title text-color`}>Browse our menu</h2>
      <p className="menu__text">
        Use our menu to place an order online, or phone our store to place a
        pickup order. Fast and fresh food.
      </p>
      <div className="menu__btn">
        <button className="btn__burger">Burgers</button>
        <button className="btn__slider">Sides</button>
        <button className="btn__drinks">Drinks</button>
        <Search></Search>
      </div>
      <ul className="card__wrap">
        {state.setGoods?.length > 0 ? (
          state.setGoods.map((el) => (
            <Card
              key={Math.random()}
              title={el.title}
              image={el.image}
              price={el.price}
              text={el.text}
            />
          ))
        ) : (
          <></>
        )}
      </ul>
    </>
  );
=======
    <div className>
        <h2 className="section__title menu__title text-color">Browse our menu</h2>
            <p className="menu__text">Use our menu to place an order online, or phone our store to place a pickup order. Fast and fresh food.</p>
            <div className="menu__btn">
              <Button modificator={"menu-btn"} text={"Burgers"}></Button>
              <Button modificator={"menu-btn menu-btn--disabled"} text={"Sides"}></Button>
              <Button modificator={"menu-btn menu-btn--disabled"} text={"Drinks"}></Button>
              <input type="text" name="search" placeholder='type your search here...' value={search} onChange={e => setSearch(e.target.value)}/>
            </div>
        <ul className='card__wrap'>
          {state.setGoods?.length > 0 
            ?
            state.setGoods.map(el => <Card key={Math.random()} title={el.title} image={el.image} price={el.price} text={el.text}/>)
            :
              <></>
          }
        </ul>
    </div>
  )
>>>>>>> bb745f1d0a7a4c0950b8888a5df06b8b8199a26c
}

export default Fullmenu;
