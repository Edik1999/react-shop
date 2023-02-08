import { Link } from "react-router-dom";
import Counter from '../components/Counter';
import Button from '../components/Button';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {cart, deleteFromCart} from '../store/slice/cartSlice';
import { RootState, useAppDispatch } from "../store";

function Cart() {

  const state = useSelector((state) => state);
  const dispatch = useAppDispatch()

  const sum = () => {
    let prices = state.cart.map(el => el.price)
    const count = (arr) => arr.reduce((acc, num) => acc + Number(num), 0);
    return count(prices)
  }

  const deleteFromCartHandler = (id) => {
    console.log(id)
    dispatch(deleteFromCart(id));
  }

  return (
    <>
      <div className="cart-page">
        <div className="cart__header">
          <h2 className="section__title cart__title text-color">Cart</h2>
        </div>
        <div className="cart__main">
          <ul className="cart__list">
            {state.cart.map(el => 
              <li className="cart__item" key={Math.random()}>
                <div className="cart__product">
                  <img className="cart__product-img" src={el.image} alt="Image" />
                  <div className="cart__product-wrap">
                    <p className="cart__product-name">{el.title}</p>
                    <div className="cart__product-price-wraper">
                      <p className="cart__product-price text-color">{el.price} ₽</p>
                      <Counter></Counter>
                    </div>
                    <div className="cart__product-delete" onClick={() => deleteFromCartHandler(el.id)}></div>
                  </div>
                </div>
              </li>
            )}
          </ul>
          <div className="cart__total">
            <p className="cart__total-title text-color">Order conditions</p>
            <div className="cart__total-count">
              <p className="cart__product-count">{state.cart.length} products</p>
              <p className="cart__total-price">Total <span className="text-color">{sum()} ₽</span> </p>
            </div>
            <Button text={"Place order"}></Button>
          </div>
        </div>
      </div>
    </>

  )
}

export default Cart