import { useSelector } from "react-redux";
import Button from "./Button";
import Counter from "./Counter";
import {useState, useEffect} from 'react'
import { useAppDispatch } from "../store";
import {cart} from '../store/slice/cartSlice';

function Modal({ isVisible, id, onClose }) {

  const state = useSelector((state) => state);

  const content = state.goods.find((el) => el.id === id);

  const [isInCart, setIsInCart] = useState();
  const dispatch = useAppDispatch()

  useEffect(() => {
      state.cart.find(elem => elem.id === id) ? setIsInCart(true) : setIsInCart(false)
  }, [state.cart, id])

  const addToCartClick = () => {
    dispatch(cart(id))
  }


  return isVisible === false ? null : (
    <div className="modal-wrapper" onClick={() => onClose()}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        {content.id ? (
          <>
            <img className="modal__card-image" src={content.image} alt="" />
            <div className="modal__card-wraper">
              <div className="modal__card-name">
                <p className="card__name">{content.title}</p>
                <p className="card__weight">вес {content.weight} гр.</p>
              </div>
              <p className="modal__card-descr">{content.text}</p>
              <p className="modal__card-text">Пищевая ценность на 100 гр.</p>
              <div className="card__info">
                <div className="card__info-wrap">
                  <p className="info__name">кКал</p>
                  <p className="info__value">{content.calory}</p>
                </div>
                <div className="card__info-wrap">
                  <p className="info__name">Белки</p>
                  <p className="info__value">{content.protein}</p>
                </div>
                <div className="card__info-wrap">
                  <p className="info__name">Жиры</p>
                  <p className="info__value">{content.fat}</p>
                </div>
                <div className="card__info-wrap">
                  <p className="info__name">Углеводы</p>
                  <p className="info__value">{content.carb}</p>
                </div>
              </div>
              <div className="modal__card-footer">
                <p className="modal__card-price text-color">
                  {content.price} &#8381;
                </p>
                {!isInCart 
                  ? <Button modificator="card__btn" text="Add to cart" onClick={() => addToCartClick()}></Button>
                  : <Counter count={state.cart.find(elem => elem.id === id) ? state.cart.find(elem => elem.id === id).count : 0} elementId={id}></Counter>
                }  
              </div>
              <div className="modal__card-delete" onClick={() => onClose()}></div>
            </div>
          </>
        ) : (
          <p>Oops, something went wrong...</p>
        )}
      </div>
    </div>
  );
}

export default Modal;
