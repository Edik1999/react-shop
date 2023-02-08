import { Link } from "react-router-dom";
import burger from "../img/burger.png";
import Button from '../components/Button';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

function Cart() {

  const state = useSelector((state) => state);
  const [content, setContent] = useState([]);

  useEffect(() => {
    setContent(state.addToCart)
  }, [])
  

  return (
    <>
      <div className="cart-page">
        <div className="cart__header">
          <h2 className="section__title cart__title text-color">Cart</h2>
        </div>
        <div className="cart__main">
          <ul className="cart__list">
            {content.map(el => 
              <li className="cart__item" key={Math.random()}>
                <div className="cart__product">
                  <img className="cart__product-img" src={el.image} alt="Image" />
                  <div className="cart__product-wrap">
                    <p className="cart__product-name">{el.title}</p>
                    <p className="cart__product-price text-color">{el.price} ₽</p>
                    <div className="cart__product-delete"></div>
                  </div>
                </div>
              </li>
            )}
          </ul>
          <div className="cart__total">
            <p className="cart__total-title text-color">Order conditions</p>
            <div className="cart__total-count">
              <p className="cart__product-count">4 products</p>
              <p className="cart__total-price">Total <span className="text-color">700 ₽</span> </p>
            </div>
            <Button text={"Place order"}></Button>
          </div>
        </div>
      </div>
    </>

  )
}

export default Cart