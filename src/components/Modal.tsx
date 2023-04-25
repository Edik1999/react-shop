import '../styles/components/modal.sass';

import {useState, useEffect} from 'react';
import { useAppDispatch } from "../store";
import {cart} from '../store/slice/cartSlice';
import {saveProductLocal} from "../helpers/saveProductLocal";
import {useAppSelector} from "../store";

import Button from "./Button";
import Counter from "./Counter";
import {PatternFormat} from "react-number-format";
import MapComponent from "./MapComponent";

interface IProps {
    isVisible: boolean,
    id?: any,
    onClose: () => void,
    order?: () => void,
    userCart?: any,
    sum?: any
}

function Modal({ isVisible, id, onClose, order, userCart, sum }: IProps) {

  const state = useAppSelector(state => state);
  const content = state.goods.find((el) => el.id === id);

  const [isInCart, setIsInCart] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [userAddress, setUserAddress] = useState(state.user.address);
  const [userPhone, setUserPhone] = useState(state.user.phone)
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [isDataConfirmed, setIsDataConfirmed] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
      setFadeIn(true)
      setUserAddress(state.user.address)
      setUserPhone(state.user.phone)
      if (id) state.cart.find((elem: { id: any; }) => elem.id === id) ? setIsInCart(true) : setIsInCart(false)
  }, [isVisible, state.cart, id, state.user])

  const addToCartClick = () => {
      dispatch(cart(id));
      saveProductLocal(id);
  }

  const close = () => {
      setFadeIn(false);
      setTimeout(() => onClose(), 400)
  }

  const showMap = () => {
      setIsMapVisible(true)
  }

  const dataConfirmation = () => {
      setIsDataConfirmed(true)
  }

  return isVisible === false ? null : (
    <div className={`modal-wrapper ${fadeIn && 'modal-wrapper--active'}`} onClick={() => close()}>
      <div className="modal__card card" onClick={e => e.stopPropagation()}>
        {content ? (
          <>
            <img className="card__image" src={content.image} alt={content.title} />
            <div className="card__wraper">
              <div className="card__header">
                <p className="card__name">{content.title}</p>
                <p className="card__weight">вес {content.weight} гр.</p>
              </div>
              <p className="card__descr">{content.text}</p>
              <p className="card__text">Пищевая ценность на 100 гр.</p>
              <div className="card__info info">
                <div className="info__wrap">
                  <p className="info__name">кКал</p>
                  <p className="info__value">{content.calory}</p>
                </div>
                <div className="info__wrap">
                  <p className="info__name">Белки</p>
                  <p className="info__value">{content.protein}</p>
                </div>
                <div className="info__wrap">
                  <p className="info__name">Жиры</p>
                  <p className="info__value">{content.fat}</p>
                </div>
                <div className="info__wrap">
                  <p className="info__name">Углеводы</p>
                  <p className="info__value">{content.carb}</p>
                </div>
              </div>
              <div className="card__footer">
                <p className="card__price text-color">
                  {content.price} &#8381;
                </p>
                {!isInCart
                  ? <Button modifier="card__btn" text="Add to cart" onClick={() => addToCartClick()}></Button>
                  : <Counter count={state.cart.find((elem: { id: any; }) => elem.id === id) ? state.cart.find((elem: { id: any; }) => elem.id === id).count : 0} elementId={id}></Counter>
                }
              </div>
              <div className="card__delete" onClick={() => close()}><div className="card__delete-inner"></div></div>
            </div>
          </>
        ) : (
            <>
                {!isDataConfirmed
                    ?
                        <>
                            <h3 className='modal__title'>Подтверждение данных для заказа</h3>
                            <form className="modal__form">
                                <PatternFormat value={userPhone} format="+7 (###) ### ## ##" mask="_" className="modal__form-input user__input" name="userPhone" placeholder="Телефон*" onChange={e => setUserPhone(e.target.value)}/>
                                <textarea value={userAddress} name="userAddress" className="modal__form-input modal__form-textarea user__input user__input--textarea" placeholder="Адрес*" onChange={e => setUserAddress(e.target.value)}/>
                            </form>
                            {!isMapVisible && <Button text="Выбрать на карте" onClick={showMap}></Button>}
                            {isMapVisible && <MapComponent setAddress={setUserAddress}></MapComponent>}
                            <Button text="Подтвердить" onClick={dataConfirmation} disabled={userPhone && userAddress ? false : true}></Button>
                        </>

                    :
                        <>
                            <ul className='modal__list'>
                                {userCart.map((el: any) =>
                                    <li className='modal__item item' key={el.id}>
                                        <img className="item__image" src={el.image} alt={el.title} />
                                        <div className='item__wrap'>
                                          <h4 className='item__title'>{el.title}</h4>
                                          <p className='item__number'>Количество: <span className='numeric'>{state.cart.find((elem: { id: any; }) => elem.id === el.id).count}</span></p>
                                          <p className='item__cost'>Стоимость: <span className='text-color numeric'>{el.price * state.cart.find((elem: { id: any; }) => elem.id === el.id).count} ₽</span></p>
                                        </div>
                                    </li>
                                )}
                            </ul>
                            <p className="modal__total">Сумма заказа: <span className="text-color">{sum} ₽</span></p>
                            <Button text="Сделать заказ" onClick={order}></Button>
                        </>
                }
            </>
        )}
      </div>
    </div>
  );
}

export default Modal;