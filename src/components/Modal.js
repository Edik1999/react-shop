import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { useAppDispatch } from '../store';
// import { useGetSingleGoodQuery } from '../store/mockAPI/mockApi';
import Button from "./Button";
import Counter from "./Counter";
// import Loader from "./Loader";

function Modal({ isVisible, id, onClose }) {

  const state = useSelector((state) => state);

  const [content, setContent] = useState({});

  useEffect(() => {
    setContent(state.goods.find((el) => el.id === id))
  }, [state.goods, id])

  return isVisible === false ? null : (
    <>

      <div className='modal-wrapper' onClick={() => onClose()}>
        <div className="modal">
          {content.id
            ?
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
                  <Counter></Counter>
                  <p className="modal__card-price text-color">{content.price} &#8381;</p>
                  <Button modificator="card__btn" text="Add to cart"></Button>
                </div>
              <div className="modal__card-delete"></div>
              </div>
            </>
        :
        <p>Oops, something went wrong...</p>
          }
      </div>
    </div>
    </>
  )
}

export default Modal