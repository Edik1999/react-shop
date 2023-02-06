import React, { useEffect, useState } from "react";
import { useDebounce } from "../hooks/debounce";
import { useSelector, useDispatch } from "react-redux";
import { RootState, useAppDispatch } from "../store";
import Card from "../components/Card";
import Search from "../components/Search";
import Button from '../components/Button';

function Fullmenu() {
  const state = useSelector((state) => state);

  useEffect(() => {
    console.log(state.setGoods?.length)
    state.setGoods.map((el) => console.log(el));
  }, [])
  
  
 
  return (
    <>
      <h2 className={`section__title menu__title text-color`}>Browse our menu</h2>
      <p className="menu__text">
        Use our menu to place an order online, or phone our store to place a
        pickup order. Fast and fresh food.
      </p>
      <div className="menu__btn">
        <Button modificator={"menu-btn"} text={"Burgers"}></Button>
        <Button modificator={"menu-btn menu-btn--disabled"} text={"Sides"}></Button>
        <Button modificator={"menu-btn menu-btn--disabled"} text={"Drinks"}></Button>
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
}

export default Fullmenu;
