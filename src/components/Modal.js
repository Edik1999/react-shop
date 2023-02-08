import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAppDispatch } from '../store';
import { useGetSingleGoodQuery } from '../store/mockAPI/mockApi';
import Loader from "./Loader";

function Modal({isVisible, id, onClose}) {

  const state = useSelector((state) => state);

  const [content, setContent] = useState({});

  useEffect(() => {
    console.log(state)
    setContent(state.setGoods.find((el) => el.id === id))
  }, [])

  return isVisible === false ? null : (
    <>
       
      <div className='modal-wrapper' onClick={() => onClose()}>
        <div className="modal">
          {content.id 
            ?
              <>
                <img className="modal__card-image" src={content.image} alt="" />
                <div className="modal__card-wraper">
                <p className="modal__card-name">{content.title}</p>
                <p className="modal__card-text">{content.text}</p>
                <p className="modal__card-price text-color">{content.price} &#8381;</p>
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