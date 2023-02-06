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
  const [activeSort, setActiveSort] = useState({
    active: 1
  })

  const filterContent = (filterString) => state.setGoods.filter(el => el.title.toLowerCase().indexOf(filterString.toLowerCase()) > -1)

  const searchHandler = (filterString) => {
    setActiveSort({active: 1})
    if(filterString.length > 0){
      setContent(filterContent(filterString).length > 0 ? filterContent(filterString) : [])
    }else{
      setContent(state.setGoods)
    }
  }

  const sortingHandler = (sortingString) => {
    setContent(state.setGoods.filter(el => el.type.toLowerCase().indexOf(sortingString.toLowerCase()) > -1))
    if (sortingString === 'Car') {
      setActiveSort({
        active: 2
      })
    }else if(sortingString === 'Chicken'){
      setActiveSort({
        active: 3
      })
    }else{
      setActiveSort({
        active: 4
      })
    }
  }

  const orderByPrice = () => {
    // console.log(content.sort((a, b) => a.price > b.price ? 1 : -1))
    // setContent(state.setGoods.sort((a, b) => a.price > b.price ? 1 : -1))
  }
 
  return (
    <>
      <h2 className="section__title menu__title text-color">Browse our menu</h2>
      <p className="menu__text">
        Use our menu to place an order online, or <span className="text-color">phone</span> our store <br/> to place a
        pickup order. Fast and fresh food.
      </p>
      <div className="menu__btn">
        <Button modificator={`menu-btn ${activeSort.active !== 1 && 'menu-btn--disabled'}`} text={"All"} onClick={(e) => {setContent(state.setGoods); setActiveSort({active: 1})}}></Button>
        <Button modificator={`menu-btn ${activeSort.active !== 2 && 'menu-btn--disabled'}`} text={"Car"} onClick={(e) => sortingHandler('Car')}></Button>
        <Button modificator={`menu-btn ${activeSort.active !== 3 && 'menu-btn--disabled'}`} text={"Chicken"} onClick={(e) => sortingHandler('Chicken')}></Button>
        <Button modificator={`menu-btn ${activeSort.active !== 4 && 'menu-btn--disabled'}`} text={"Salad"} onClick={(e) => sortingHandler('Salad')}></Button>
        <Button modificator={`menu-btn ${'menu-btn--disabled'}`} text={"Price"} onClick={(e) => orderByPrice()}></Button>
        <Search handler={searchHandler}></Search>
      </div>
      <ul className="card__wrap">
        {content.length > 0 ? (
          content.map((el) => (
            <Card key={Math.random()} id={el.id} title={el.title} image={el.image} price={el.price} text={el.text} type={el.type}/>
          ))
        ) : (
          <p>Oops, try another search</p>
        )}
      </ul>
      {/* <Link to="/"><Button modificator={"menu-btn btn-view"} text={"View Full Menu"}></Button></Link> */}
    </>
  );
}

export default Fullmenu;
