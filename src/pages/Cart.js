import Counter from '../components/Counter';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteFromCart } from '../store/slice/cartSlice';
import { useAppDispatch } from "../store";
import { withAuthenticationRequired } from '@auth0/auth0-react'

export const Cart = withAuthenticationRequired(() => {

  const [pageContent, setPageContent] = useState([])

  const state = useSelector((state) => state);
  const dispatch = useAppDispatch();

  const sum = () => {
    let prices = state.cart.map(el => (state.goods.find(elem => elem.id === el.id).price * el.count))
    const count = (arr) => arr.reduce((acc, num) => acc + Number(num), 0);
    return count(prices)
  }

  const deleteFromCartHandler = (e, id) => {
    e.target.closest('.cart__item').style.opacity = '0';
    setTimeout(() => {
      dispatch(deleteFromCart(id))
    }, 300)
  }

  useEffect(() => {
    setPageContent(state.cart.map((el) => state.goods.find(elem => el.id === elem.id)))
  }, [state.cart, state.goods])

  return (
    <>
      <div className="cart-page">
        <h2 className="section__title cart__title text-color">Cart</h2>
        <div className="cart__main">
          <ul className="cart__list">
            {pageContent.length > 0
              ?
              pageContent.map((el) =>
                <li className="cart__item" key={el.id}>
                  <div className="cart__product">
                    <img className="cart__product-img" src={el.image} alt={''} />
                    <div className="cart__product-wrap">
                      <p className="cart__product-name">{el.title}</p>
                      <div className={`cart__product-price-wraper ${el.id}`}>
                        <Counter count={state.cart.find(elem => elem.id === el.id) ? state.cart.find(elem => elem.id === el.id).count : 0} elementId={el.id} deleteHandler={(e, id) => deleteFromCartHandler(e, id)}></Counter>
                        <p className="cart__product-price text-color">{el.price} ₽</p>
                      </div>
                      <div className="cart__product-delete" onClick={(e) => deleteFromCartHandler(e, el.id)}><div className="cart__product-delete-inner"></div></div>
                    </div>
                  </div>
                </li>
              )
              :
              <>
                <li className="cart__empty">
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
            <p className="cart__total-title text-color">Order conditions</p>
            <div className="cart__total-count">
              <p className="cart__product-count">{state.cart.reduce((acc, num) => acc + Number(num.count), 0)} products</p>
              <p className="cart__total-price">Total <span className="text-color">{sum()} ₽</span> </p>
            </div>
            <Button text={"Place order"} modificator={'cart-btn-total'}></Button>
          </div>
        </div>
      </div>
    </>

  )
})