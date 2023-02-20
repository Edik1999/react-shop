import React, {useState, useEffect} from 'react'
import Button from '../components/Button';
import { useSelector } from "react-redux";
import Counter from './Counter';

function Card({id, title, image, price, text, type, click, addToCartClick}) {

    const [isInCart, setIsInCart] = useState(false)

    const state = useSelector((state) => state);
    let elementInCartId;
    let count = [];

    useEffect(() => {
        if(state.cart.length > 0){
            elementInCartId = state.cart.findIndex((el) => el.id === id)
            if(elementInCartId >= 0) {
                setIsInCart(true)
                count = state.cart.filter(el => el.id === id)
            }else{
                setIsInCart(false)
            }    
            
            console.log(count.length)
        }
    }, [state.cart])
    

    return (
        <div className={`card ${id} ${type}`} onClick={() => click(id)}>
            <img className="card__image" src={image} alt="" />
            <div className="card__content">
                <p className="card__name">{title}</p>
                <div className='card__footer'>
                    <p className="card__price text-color">{price} &#8381;</p>
                    {!isInCart 
                        ?
                            <Button modificator={"card__btn"} text={"Add to cart"} onClick={(e) => addToCartClick(e, id)}></Button>
                        :
                            <Counter count={count.length} elementId={0}></Counter>
                    }   
                </div>
            </div>
        </div>
    )
}

export default Card