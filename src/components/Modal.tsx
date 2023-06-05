import '../styles/components/modal.sass';

import {useState, useEffect} from 'react';
import { useAppDispatch } from "../store";
import {cart} from '../store/slice/cartSlice';
import {saveProductLocal} from "../helpers/saveProductLocal";
import {useAppSelector} from "../store";

import Button from "./Button";
import Delete from "./Delete";
import Counter from "./Counter";
import {PatternFormat} from "react-number-format";
import MapComponent from "./MapComponent";
import {IpageContent} from "../pages/Cart";

interface IProps {
    isVisible: boolean,
    id?: number | undefined,
    onClose: () => void,
    order?: () => void,
    userCart?: IpageContent[],
    sum?: number
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
      if (id) state.cart.find((elem: { id: number }) => elem.id === id) ? setIsInCart(true) : setIsInCart(false)
  }, [isVisible, state.cart, id, state.user])

  const addToCartClick = () => {
      dispatch(cart(id));
      if (id) saveProductLocal(id);
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

  const info = [
    {
        text: 'кКал',
        parameter: content?.calory,
    },
    {
        text: 'Белки',
        parameter: content?.protein,
    },
    {
        text: 'Жиры',
        parameter: content?.fat,
    },
    {
        text: 'Углеводы',
        parameter: content?.carb,
    }
  ]

  return isVisible === false ? null : (
    <div className={`modal-wrapper ${fadeIn && 'modal-wrapper--active'}`} onClick={close}>
      <div className={`modal__card card ${id ? 'flex' : 'flex-x-between-y-center flex--column'}`} onClick={e => e.stopPropagation()}>
        {content ? (
          <>
            <img className="card__image" src={content.image} alt={content.title} />
            <div className="card__wraper flex-x-between flex--column">
              <div className="card__header flex-x-center-y-end">
                <p className="card__title">{content.title}</p>
                <p className="card__weight">вес {content.weight} гр.</p>
              </div>
              <p className="card__descr">{content.text}</p>
              <p className="card__text">Пищевая ценность на 100 гр.</p>
              <div className="card__info info flex-x-around">
                {info.map((el) => (
                    <div className="info__wrap flex-x-between-y-center flex--column" key={el.text}>
                        <p className="info__name">{el.text}</p>
                        <p className="info__value">{el.parameter}</p>
                    </div>
                ))}
              </div>
              <div className="card__footer flex-x-between-y-center">
                <p className="card__price text-color">
                  {content.price} &#8381;
                </p>
                {!isInCart
                  ? <Button modifier="card-btn" text="Add to cart" onClick={addToCartClick}></Button>
                  : <Counter count={state.cart.find((elem: { id: number }) => elem.id === id) ? state.cart.find((elem: { id: number }) => elem.id === id).count : 0} elementId={id}></Counter>
                }
              </div>
            </div>
          </>
        ) : (
            <>
                {!isDataConfirmed
                    ?
                        <>
                            <h3 className='modal__title'>Подтверждение данных для заказа</h3>
                            <form className="modal__form form">
                                <PatternFormat value={userPhone} format="+7 (###) ### ## ##" mask="_" className="form__input input" name="userPhone" placeholder="Телефон*" onChange={e => setUserPhone(e.target.value)}/>
                                <textarea value={userAddress} name="userAddress" className="form__textarea input input--textarea" placeholder="Адрес*" rows={3} onChange={e => setUserAddress(e.target.value)}/>
                            </form>
                            {!isMapVisible && <Button modifier='modal-btn' text="Выбрать на карте" onClick={showMap}></Button>}
                            {isMapVisible && <MapComponent setAddress={setUserAddress}></MapComponent>}
                            <Button text="Подтвердить" onClick={dataConfirmation} disabled={userPhone && userAddress ? false : true}></Button>
                        </>

                    :
                        <>
                            <ul className='modal__list flex--column'>
                                {userCart?.map(el =>
                                    <li className='modal__item item flex-x-around' key={el.id}>
                                        <img className="item__image" src={el.image} alt={el.title} />
                                        <div className='item__wrap flex-x-between-y-center'>
                                          <h4 className='item__title'>{el.title}</h4>
                                          <p className='item__number'>Количество: <span className='text-color number'>{state.cart.find((elem: { id: number }) => elem.id === el.id)?.count}</span></p>
                                          <p className='item__cost'>Стоимость: <span className='text-color number'>{Number(el.price) * state.cart.find((elem: { id: number }) => elem.id === el.id)?.count} ₽</span></p>
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
        <Delete parentClass="card__delete" onClick={close}/>
      </div>
    </div>
  );
}

export default Modal;