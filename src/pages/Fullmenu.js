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
  const [activeSort, setActiveSort] = useState(1)
  const [priceSort, setPriceSort] = useState(1)

  const filterContent = (filterString) => state.setGoods.filter(el => el.title.toLowerCase().indexOf(filterString.toLowerCase()) > -1)

  const searchHandler = (filterString) => {
    setActiveSort(1)
    if(filterString.length > 0){
      setContent(filterContent(filterString).length > 0 ? filterContent(filterString) : [])
    }else{
      setContent(state.setGoods)
    }
  }

  const sortingHandler = (sortingString) => {
    setPriceSort(1);
    setContent(state.setGoods.filter(el => el.type.toLowerCase().indexOf(sortingString.toLowerCase()) > -1))
    switch (sortingString) {
      case 'Pizza':
        setActiveSort(2)
        break;
      case 'Burger':
        setActiveSort(3)
        break;
      default:
        setActiveSort(4)
        break;
    }
  }

  const orderByPrice = () => {
    let copyContent = [...content]
    let sortedContent = copyContent.sort((a, b) => a.price > b.price ? 1 : -1);
    setActiveOrderByPrice();
    setContent(sortedContent);
  }

  const setActiveOrderByPrice = () => {
    switch (priceSort) {
      case 1:
        setPriceSort(2)
        break;
      case 2:
        setPriceSort(3)
        break;
      default:
        setPriceSort(1)
        break;
    }
  }

  const whichClass = () => {
    switch (priceSort) {
      case 2:
        return 'whiteDown'
        break;
      case 3:
          return 'whiteUp'
          break;
      default:
        return 'menu-btn--disabled'
        break;
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
        <Button modificator={`menu-btn ${activeSort !== 1 && 'menu-btn--disabled'}`} text={"Показать все"} onClick={(e) => {setContent(state.setGoods); setActiveSort(1)}}></Button>
        <Button modificator={`menu-btn ${activeSort !== 2 && 'menu-btn--disabled'}`} text={"Пицца"} onClick={(e) => sortingHandler('Pizza')}></Button>
        <Button modificator={`menu-btn ${activeSort !== 3 && 'menu-btn--disabled'}`} text={"Бургеры"} onClick={(e) => sortingHandler('Burger')}></Button>
        <Button modificator={`menu-btn ${activeSort !== 4 && 'menu-btn--disabled'}`} text={"Роллы"} onClick={(e) => sortingHandler('Roll')}></Button>
        <Button modificator={`menu-btn sorting-btn ${whichClass()}`} text={"Price"} onClick={(e) => orderByPrice()}></Button>
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
