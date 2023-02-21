import React, {useState, useEffect} from 'react'
import Button from '../components/Button';
import { useSelector } from "react-redux";
import Counter from './Counter';
import { useAppDispatch } from "../store";
import {cart} from '../store/slice/cartSlice';

function Card({id, title, image, price, text, type, click}) {

    const [isInCart, setIsInCart] = useState();
    const dispatch = useAppDispatch()

    const state = useSelector((state) => state);

    useEffect(() => {
        state.cart.find(elem => elem.id === id) ? setIsInCart(true) : setIsInCart(false)
    }, [state.cart, id])

    const addToCartClick = (e) => {
        e.stopPropagation();
        dispatch(cart(id))
    }
    
    return (
        <div className={`card ${id} ${type}`} onClick={() => click(id)}>
            <img className="card__image" src={image} alt="" />
            <div className="card__content">
                <p className="card__name">{title}</p>
                <div className='card__footer'>
                    <p className="card__price text-color">{price} &#8381;</p>
                    {!isInCart 
                        ?
                            <Button modificator={"card__btn"} text={"Add to cart"} onClick={(e) => addToCartClick(e)}></Button>
                        :
                            <Counter count={state.cart.find(elem => elem.id === id) ? state.cart.find(elem => elem.id === id).count : 0} elementId={id}></Counter>
                    }   
                </div>
            </div>
        </div>
    )
}

export default Card