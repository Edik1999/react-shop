import React, { useEffect, useState } from "react";
import { useDebounce } from "../hooks/debounce";
import { useSelector, useDispatch } from "react-redux";
import { RootState, useAppDispatch } from "../store";
import Card from "../components/Card";
import Search from "../components/Search";
import Button from '../components/Button';
import { Link } from 'react-router-dom';

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
      <h2 className="section__title menu__title text-color">Browse our menu</h2>
      <p className="menu__text">
        Use our menu to place an order online, or <span className="text-color">phone</span> our store <br/> to place a
        pickup order. Fast and fresh food.
      </p>
      <div className="menu__btn">
        <Link to="/"><Button modificator={"menu-btn"} text={"Burgers"}></Button></Link>
        <Link to="/"><Button modificator={"menu-btn menu-btn--disabled"} text={"Sides"}></Button></Link>
        <Link to="/"><Button modificator={"menu-btn menu-btn--disabled"} text={"Drinks"}></Button></Link>
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
      {/* <Link to="/"><Button modificator={"menu-btn btn-view"} text={"View Full Menu"}></Button></Link> */}
    </>
  );
}

export default Fullmenu;
