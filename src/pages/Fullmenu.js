import React, { useEffect, useState } from "react";
import { useDebounce } from "../hooks/debounce";
import { useSelector, useDispatch } from "react-redux";
import { RootState, useAppDispatch } from "../store";
import Card from "../components/Card";
import Search from "../components/Search";
import Button from '../components/Button';

function Fullmenu() {
  const state = useSelector((state) => state);

  const [content, setContent] = useState(state.setGoods)

  const searchHandler = (filterString) => {
    if(filterString.length > 0){
      setContent(content.filter(el => el.title.toLowerCase().indexOf(filterString.toLowerCase()) > -1))
    }else{
      setContent(state.setGoods)
    }
  }
 
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
        <Search handler={searchHandler}></Search>
      </div>
      <ul className="card__wrap">
        {content.length > 0 ? (
          content.map((el) => (
            <Card
              key={Math.random()}
              id={el.id}
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
