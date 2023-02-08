import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAppDispatch } from '../store';
import { useGetSingleGoodQuery } from '../store/mockAPI/mockApi';
import Loader from "./Loader";

function Modal({isVisible, id, onClose}) {

  const state = useSelector((state) => state);

  const [content, setContent] = useState({});

  useEffect(() => {
    setContent(state.goods.find((el) => el.id === id))
  }, [])

  return isVisible === false ? null : (
    <>
       
      <div className='modal-wrapper' onClick={() => onClose()}>
        <div className="modal">
          {content.id 
            ?
              <>
                <p className="card__name">{content.title}</p>
                <img className="card__image" src={content.image} alt="" />
                <p className="card__text">{content.text}</p>
                <p className="card__price text-color">{content.price} &#8381;</p>
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