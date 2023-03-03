import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store";
import Card from "../components/Card";
import Search from "../components/Search";
import Button from '../components/Button';
import Modal from '../components/Modal';
import { useGetGoodsQuery } from "../store/mockAPI/mockApi";
import { goods } from "../store/slice/goodsSlice";
import Loader from "../components/Loader";
import { withAuthenticationRequired } from '@auth0/auth0-react'

export const Fullmenu = withAuthenticationRequired(() => {

    const { isLoading, isError, data } = useGetGoodsQuery("");

    const state = useSelector((state) => state);

    const [content, setContent] = useState(state.goods)
    const [activeSort, setActiveSort] = useState(1)
    const [priceSort, setPriceSort] = useState(1)
    const [modalState, setModalState] = useState(false)
    const [clickedCard, setClickedCard] = useState()

    const dispatch = useAppDispatch()

    useEffect(() => {
      if (data) {
        dispatch(goods(data))
        setContent(data)
      }
    }, [data, dispatch])

    const filterContent = (filterString) => state.goods.filter(el => el.title.toLowerCase().indexOf(filterString.toLowerCase()) > -1)

    const searchHandler = (filterString) => {
      setActiveSort(1)
      if(filterString.length > 0){
        setContent(filterContent(filterString).length > 0 ? filterContent(filterString) : [])
      }else{
        setContent(state.goods)
      }
    }

    const sortingHandler = (sortingString) => {
      setPriceSort(1);
      setContent(state.goods.filter(el => el.type.toLowerCase().indexOf(sortingString.toLowerCase()) > -1))
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
      let copyContent = [...content];
      let sortedContent = [];
      if (priceSort === 1){
        sortedContent = copyContent.sort((a, b) => a.price > b.price ? 1 : -1);
      }else if(priceSort === 2){
        sortedContent = copyContent.sort((a, b) => a.price < b.price ? 1 : -1);
      }else if(priceSort === 3){
        if(activeSort !== 1){
          sortedContent = state.goods.filter(el => el.type.toLowerCase().indexOf(whichSort().toLowerCase()) > -1)
        }else {
          sortedContent = state.goods
        }
      }
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
        case 3:
            return 'whiteUp'
        default:
          return 'menu-btn--disabled'
      }
    }

    function whichSort() {
      switch (activeSort) {
        case 2:
          return 'Pizza'
        case 3:
          return 'Burger'
        case 4:
          return 'Roll'
        default:
          break;
      }
    }

    const cardClickHandler = (id) => {
      setClickedCard(id)
      setModalState(!modalState)
    }

    const closeModal = () => {
      setClickedCard(undefined)
      setModalState(!modalState)
    }

    if (isLoading) {
      document.querySelector('body').style.overflow = 'hidden';
    } else {
      document.querySelector('body').style.overflowY = 'visible';
    }

    return (
      <>
        {isLoading && <Loader></Loader>}

        {isError ? (
          <p>Oops, something went wrong...</p>
        ) : (
          <>
            <h2 className="section__title menu__title text-color">Browse our menu</h2>
            <p className="menu__text">
              Use our menu to place an order online, or <span className="text-color">phone</span> our store <br/> to place a
              pickup order. Fast and fresh food.
            </p>
            <div className="menu__btn">
              <Button modificator={`menu-btn ${activeSort !== 1 && 'menu-btn--disabled'}`} text={"Показать все"} onClick={(e) => {setContent(state.goods); setActiveSort(1); setPriceSort(1)}}></Button>
              <Button modificator={`menu-btn ${activeSort !== 2 && 'menu-btn--disabled'}`} text={"Пицца"} onClick={(e) => sortingHandler('Pizza')}></Button>
              <Button modificator={`menu-btn ${activeSort !== 3 && 'menu-btn--disabled'}`} text={"Бургеры"} onClick={(e) => sortingHandler('Burger')}></Button>
              <Button modificator={`menu-btn ${activeSort !== 4 && 'menu-btn--disabled'}`} text={"Роллы"} onClick={(e) => sortingHandler('Roll')}></Button>
              <Button modificator={`menu-btn sorting-btn ${whichClass()}`} text={"Price"} onClick={(e) => orderByPrice()}></Button>
              <Search handler={searchHandler}></Search>
            </div>
            <ul className="card__wrap">
              {content.length > 0 ? (
                content.map((el) => (
                  <Card key={el.id} id={el.id} title={el.title} image={el.image} price={el.price} text={el.text} type={el.type} click={(id) => cardClickHandler(id)} />
                ))
              ) : (
                <p>Oops, try another search</p>
              )}
            </ul>
            {clickedCard ? <Modal isVisible={modalState} id={clickedCard} onClose={closeModal}></Modal> : null}
          </>
        )}
      </>
    )
  }
)