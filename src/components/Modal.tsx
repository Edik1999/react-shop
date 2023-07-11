import '../styles/components/modal.sass';

import {useState, useEffect} from 'react';
import { useAppDispatch } from "../store";
import {cart} from '../store/slice/cartSlice';
import {saveProductLocal} from "../helpers/saveProductLocal";
import {useAppSelector} from "../store";
import {useTranslation} from "react-i18next";

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
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [isInCart, setIsInCart] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [userAddress, setUserAddress] = useState(state.user.address);
  const [userPhone, setUserPhone] = useState(state.user.phone)
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [isDataConfirmed, setIsDataConfirmed] = useState(false);


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
        text: t('calories'),
        parameter: content?.calory,
    },
    {
        text: t('protein'),
        parameter: content?.protein,
    },
    {
        text: t('fat'),
        parameter: content?.fat,
    },
    {
        text: t('carbs'),
        parameter: content?.carb,
    }
  ]

  return isVisible === false ? null : (
    <div className={`modal-wrapper ${fadeIn && 'modal-wrapper--active'}`} onClick={close}>
      <div className={`modal ${id ? 'flex' : 'flex-x-between-y-center flex--column'}`} onClick={e => e.stopPropagation()}>
        {content ? (
          <>
            <img className="modal__image" src={content.image} alt={state.lang === 'ru' ? content.title : content.title_en} />
            <div className="modal__wraper flex-x-between flex--column">
              <div className="modal__header flex-x-center-y-end">
                <p className="modal__title">{state.lang === 'ru' ? content.title : content.title_en}</p>
                <p className="modal__weight">{t('weight')} {content.weight} {t('gram')}.</p>
              </div>
              <p className="modal__descr">{state.lang === 'ru' ? content.text : content.text_en}</p>
              <p className="modal__text">{t('nutritionalValue')}</p>
              <div className="modal__info info flex-x-around">
                {info.map((el) => (
                    <div className="info__wrap flex-x-between-y-center flex--column" key={el.text}>
                        <p className="info__name">{el.text}</p>
                        <p className="info__value">{el.parameter}</p>
                    </div>
                ))}
              </div>
              <div className="modal__footer flex-x-between-y-center">
                <p className="modal__price text-color">
                  {content.price} {t('currency')}
                </p>
                {!isInCart
                  ? <Button modifier="card-btn" text={t('AddToCart')} onClick={addToCartClick}></Button>
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
                            <h3 className='modal__title'>{t('modalTitle')}</h3>
                            <form className="modal__form form">
                                <PatternFormat value={userPhone} format="+7 (###) ### ## ##" mask="_" className="form__input input" name="userPhone" placeholder={t('inputPhonePlaceholder')} onChange={e => setUserPhone(e.target.value)}/>
                                <textarea value={userAddress} name="userAddress" className="form__textarea input input--textarea" placeholder={t('inputAddressPlaceholder')} rows={3} onChange={e => setUserAddress(e.target.value)}/>
                            </form>
                            {!isMapVisible && <Button modifier='modal-btn' text={t('pickOnMap')} onClick={showMap}></Button>}
                            {isMapVisible && <MapComponent setAddress={setUserAddress}></MapComponent>}
                            <Button text={t('confirm')} onClick={dataConfirmation} disabled={userPhone && userAddress ? false : true}></Button>
                        </>

                    :
                        <>
                            <ul className='modal__list flex--column'>
                                {userCart?.map(el =>
                                    <li className='modal__item item flex-x-around' key={el.id}>
                                        <img className="item__image" src={el.image} alt={state.lang === 'ru' ? el.title : el.title_en} />
                                        <div className='item__wrap flex-x-between-y-center'>
                                          <h4 className='item__title'>{state.lang === 'ru' ? el.title : el.title_en}</h4>
                                          <p className='item__number'>{t('amount')} : <span className='text-color number'>{state.cart.find((elem: { id: number }) => elem.id === el.id)?.count}</span></p>
                                          <p className='item__cost'>{t('cost')} : <span className='text-color number'>{Number(el.price) * state.cart.find((elem: { id: number }) => elem.id === el.id)?.count} {t('currency')}</span></p>
                                        </div>
                                    </li>
                                )}
                            </ul>
                            <p className="modal__total">{t('orderPrice')} : <span className="text-color">{sum} {t('currency')}</span></p>
                            <Button text={t('makeOrder')} onClick={order}></Button>
                        </>
                }
            </>
        )}
        <Delete parentClass="modal__delete" onClick={close}/>
      </div>
    </div>
  );
}

export default Modal;