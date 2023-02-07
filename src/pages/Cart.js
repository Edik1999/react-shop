import { Link } from "react-router-dom";
import burger from "../img/burger.png";
import Button from '../components/Button';

function Cart() {
  return (
    <>
      <div className="cart-page">
        <div className="cart__header">
          <h2 className="section__title cart__title text-color">Cart</h2>
        </div>
        <div className="cart__main">
          <ul className="cart__list">
            <li className="cart__item">
              <div className="cart__product">
                <img className="cart__product-img" src={burger} alt="Image" />
                <div className="cart__product-wrap">
                  <p className="cart__product-name">Big Egg</p>
                  <p className="cart__product-price text-color">399 ₽</p>
                  <div className="cart__product-delete"></div>
                </div>
              </div>
            </li>
            <li className="cart__item">
              <div className="cart__product">
                <img className="cart__product-img" src={burger} alt="Image" />
                <div className="cart__product-wrap">
                  <p className="cart__product-name">Big Egg</p>
                  <p className="cart__product-price text-color">399 ₽</p>
                  <div className="cart__product-delete"></div>
                </div>
              </div>
            </li>
            <li className="cart__item">
              <div className="cart__product">
                <img className="cart__product-img" src={burger} alt="Image" />
                <div className="cart__product-wrap">
                  <p className="cart__product-name">Big Egg</p>
                  <p className="cart__product-price text-color">399 ₽</p>
                  <div className="cart__product-delete"></div>
                </div>
              </div>
            </li>
            <li className="cart__item">
              <div className="cart__product">
                <img className="cart__product-img" src={burger} alt="Image" />
                <div className="cart__product-wrap">
                  <p className="cart__product-name">Big Egg</p>
                  <p className="cart__product-price text-color">399 ₽</p>
                  <div className="cart__product-delete"></div>
                </div>
              </div>
            </li>
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