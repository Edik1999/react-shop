import '../styles/pages/Cart.sass';

import { MouseEvent, useEffect, useState} from "react";
import {deleteFromCart, clearCart} from '../store/slice/cartSlice';
import {useAppDispatch, useAppSelector} from "../store";
import {withAuthenticationRequired} from '@auth0/auth0-react';
import {addDoc, collection} from "firebase/firestore";

import { Link } from 'react-router-dom';
import Counter from '../components/Counter';
import Button from '../components/Button';
import Modal from "../components/Modal";
import Delete from "../components/Delete";

export const Cart = withAuthenticationRequired(({db}: {db: any}) => {

  const [pageContent, setPageContent] = useState([])
  const [isOrdered, setIsOrdered] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const state = useAppSelector(state => state);
  const dispatch = useAppDispatch();

  const sum = () => {
    let prices = state.cart.map((el: { id: any; count: number; }) => (state.goods.find(elem => elem.id === el.id).price * el.count))
    const count = (arr: any[]) => arr.reduce((acc, num) => acc + Number(num), 0);
    return count(prices)
  }

  const deleteFromCartHandler = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, id: any) => {
    if(e.target instanceof Element){
      e.target.closest<HTMLElement>('.cart__item')!.style.opacity = '0';
      setTimeout(() => {
        dispatch(deleteFromCart(id))

        if(localStorage.getItem('cart')){
          let localStorageCart = JSON.parse(localStorage.getItem('cart') || "");
          localStorage.setItem('cart', JSON.stringify(localStorageCart.filter((el: { id: any; }) => el.id !== id)));
          if(localStorage.getItem('cart') === '[]') localStorage.removeItem('cart')
        }
      }, 300)
    }
  }

  useEffect(() => {
    setPageContent(state.cart.map((el: { id: any; }) => state.goods.find(elem => el.id === elem.id)))
  }, [state.cart, state.goods])

  async function saveOrder(){
    await addDoc(collection(db, "orders"), {
      user: state.user.email,
      date: new Date(),
      sum: sum(),
      items: state.cart
    });
  }

  const order = () => {
    setIsOrdered(true)
    saveOrder().then(() => console.log('order saved'))
    localStorage.removeItem('cart')
    dispatch(clearCart())
  }

  const openModal = () => {
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  }

  return (
    <>
      <div className="cart">
        <h2 className="cart__title section__title text-color">Cart</h2>
        <div className="cart__main">
          {!isOrdered
            ?
              <>
                <ul className="cart__list">
                  {pageContent.length > 0
                    ?
                    pageContent.map((el: any) =>
                      <li className="cart__item" key={el.id}>
                        <div className="cart__product product">
                          <img className="product__img" src={el.image} alt={el.title} />
                          <div className="product__wrap">
                            <p className="product__name">{el.title}</p>
                            <div className={`product__price-wraper ${el.id}`}>
                              <Counter
                                  count={state.cart.find((elem: { id: any; }) => elem.id === el.id) ? state.cart.find((elem: { id: any; }) => elem.id === el.id).count : 0}
                                  elementId={el.id}
                                  deleteHandler={(e, id) => deleteFromCartHandler(e, id)}></Counter>
                              <p className="product__price text-color">{el.price * (state.cart.find((elem: { id: any; }) => elem.id === el.id) ? state.cart.find((elem: { id: any; }) => elem.id === el.id).count : 0)} ₽</p>
                            </div>
                            <Delete parentClass="product__delete" onClick={e => deleteFromCartHandler(e, el.id)}/>
                          </div>
                        </div>
                      </li>
                    )
                    :
                    <>
                      <li className="cart__text section__text">
                        Корзина пуста, вы можете сделать заказ в нашем меню
                      </li>
                      <li className="cart__btn-wrapper">
                        <Link to="/Home" className="btn cart-btn">На главную</Link>
                        <Link to="/menu" className="btn cart-btn">Order now!</Link>
                      </li>
                    </>
                  }
                </ul>
                <div className="cart__total total">
                  <h3 className="total__title text-color">Order conditions</h3>
                  <div className="total__wrapper">
                    <p className="total__count">{state.cart.reduce((acc: number, num: { count: any; }) => acc + Number(num.count), 0)} products</p>
                    <p className="total__price">Total <span className="text-color">{sum()} ₽</span></p>
                  </div>
                  <Button text="Place order" disabled={pageContent.length > 0 ? false : true} onClick={openModal}></Button>
                </div>
                <Modal isVisible={showModal} onClose={closeModal} order={order} userCart={pageContent} sum={sum()}></Modal>
              </>
            :
              <h2 className="cart__title cart__title--success section__title">Thank you for Order !</h2>
          }
        </div>
      </div>
    </>
  )
})