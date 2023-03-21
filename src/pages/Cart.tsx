import Counter from '../components/Counter';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { MouseEvent, useEffect, useState} from "react";
import {deleteFromCart} from '../store/slice/cartSlice';
import {useAppDispatch, useAppSelector} from "../store";
import {withAuthenticationRequired} from '@auth0/auth0-react'

export const Cart = withAuthenticationRequired(() => {

  const [pageContent, setPageContent] = useState([])

  const state = useAppSelector(state => state);
  const dispatch = useAppDispatch();

  const sum = () => {
    let prices = state.cart.map((el: { id: any; count: number; }) => (state.goods.find(elem => elem.id === el.id).price * el.count))
    const count = (arr: any[]) => arr.reduce((acc, num) => acc + Number(num), 0);
    return count(prices)
  }

  const deleteFromCartHandler = (e: MouseEvent, id: any) => {
    // @ts-ignore
    e.target.closest('.cart__item').style.opacity = '0';
    setTimeout(() => {
      dispatch(deleteFromCart(id))

      let localStorageCart = JSON.parse(localStorage.getItem('cart') || "");
      localStorage.setItem('cart', JSON.stringify(localStorageCart.filter((el: { id: any; }) => el.id !== id)));
      if(localStorage.getItem('cart') === '[]') localStorage.removeItem('cart')
    }, 300)
  }

  useEffect(() => {
    setPageContent(state.cart.map((el: { id: any; }) => state.goods.find(elem => el.id === elem.id)))
  }, [state.cart, state.goods])

  return (
    <>
      <div className="cart-page">
        <h2 className="section__title text-color">Cart</h2>
        <div className="cart__main">
          <ul className="cart__list">
            {pageContent.length > 0
              ?
              pageContent.map((el: any) =>
                <li className="cart__item" key={el.id}>
                  <div className="cart__product">
                    <img className="cart__product-img" src={el.image} alt={el.title} />
                    <div className="cart__product-wrap">
                      <p className="cart__product-name">{el.title}</p>
                      <div className={`cart__product-price-wraper ${el.id}`}>
                        <Counter
                            count={state.cart.find((elem: { id: any; }) => elem.id === el.id) ? state.cart.find((elem: { id: any; }) => elem.id === el.id).count : 0}
                            elementId={el.id}
                            deleteHandler={(e: MouseEvent<HTMLDivElement>, id: any) => deleteFromCartHandler(e, id)}></Counter>
                        <p className="cart__product-price text-color">{el.price} ₽</p>
                      </div>
                      <div className="cart__product-delete" onClick={(e) => deleteFromCartHandler(e, el.id)}><div className="cart__product-delete-inner"></div></div>
                    </div>
                  </div>
                </li>
              )
              :
              <>
                <li className="section__text">
                  Корзина пуста, вы можете сделать заказ в нашем меню
                </li>
                <li className="cart__empty-btn">
                  <Link to="/Home" className="btn cart-btn">На главную</Link>
                  <Link to="/menu" className="btn cart-btn">Order now!</Link>
                </li>
              </>
            }
          </ul>
          <div className="cart__total">
            <h3 className="cart__title text-color">Order conditions</h3>
            <div className="cart__total-count">
              <p className="cart__product-count">{state.cart.reduce((acc: number, num: { count: any; }) => acc + Number(num.count), 0)} products</p>
              <p className="cart__total-price">Total <span className="text-color">{sum()} ₽</span> </p>
            </div>
            <Button text={"Place order"} modificator={""}></Button>
          </div>
        </div>
      </div>
    </>
  )
})