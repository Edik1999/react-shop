import '../styles/pages/Cart.sass';

import { MouseEvent, useEffect, useState} from "react";
import {deleteFromCart, clearCart} from '../store/slice/cartSlice';
import {useAppDispatch, useAppSelector} from "../store";
import {useAuth0, withAuthenticationRequired} from '@auth0/auth0-react';
import {addDoc, collection} from "firebase/firestore";

import { Link } from 'react-router-dom';
import Counter from '../components/Counter';
import Button from '../components/Button';

export const Cart = withAuthenticationRequired(({db}: {db: any}) => {

  const [pageContent, setPageContent] = useState([])
  const [isOrdered, setIsOrdered] = useState(false)

  const state = useAppSelector(state => state);
  const dispatch = useAppDispatch();
  const {user} = useAuth0();

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

      if(localStorage.getItem('cart')){
        let localStorageCart = JSON.parse(localStorage.getItem('cart') || "");
        localStorage.setItem('cart', JSON.stringify(localStorageCart.filter((el: { id: any; }) => el.id !== id)));
        if(localStorage.getItem('cart') === '[]') localStorage.removeItem('cart')
      }
    }, 300)
  }

  useEffect(() => {
    setPageContent(state.cart.map((el: { id: any; }) => state.goods.find(elem => el.id === elem.id)))
  }, [state.cart, state.goods])

  async function saveOrder(){
    await addDoc(collection(db, "orders"), {
      user: user?.email,
      date: new Date(),
      sum: sum(),
      items: state.cart
    });
    console.log('order saved');
  }

  const order = () => {
    setIsOrdered(true)
    saveOrder()
    localStorage.removeItem('cart')
    dispatch(clearCart())
  }

  return (
    <>
      <div className="cart-page">
        <h2 className="section__title text-color">Cart</h2>
        <div className="cart__main">
          {!isOrdered
            ?
              <>
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
                                  deleteHandler={(e, id) => deleteFromCartHandler(e, id)}></Counter>
                              <p className="cart__product-price text-color">{el.price * (state.cart.find((elem: { id: any; }) => elem.id === el.id) ? state.cart.find((elem: { id: any; }) => elem.id === el.id).count : 0)} ₽</p>
                            </div>
                            <div className="cart__product-delete" onClick={e => deleteFromCartHandler(e, el.id)}><div className="cart__product-delete-inner"></div></div>
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
                  <Button text={"Place order"} disabled={pageContent.length > 0 ? false : true} onClick={order}></Button>
                </div>
              </>
            :
              <p className="section__title">Thank you for your Order!</p>
          }
        </div>
      </div>
    </>
  )
})