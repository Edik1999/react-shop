import React from 'react'
// import burger from "../img/burger.png";
import Button from '../components/Button';
// import { Link } from 'react-router-dom';

function Card({id, title, image, price, text, type, click, addToCartClick}) {

    return (
        <>
            <div className={`card ${id} ${type}`} onClick={() => click(id)}>
                <img className="card__image" src={image} alt="" />
                <div className="card__content">
                    <p className="card__name">{title}</p>
                    {/* <p className="card__text">{text}</p> */}
                    <div className='card__footer'>
                        <p className="card__price text-color">{price} &#8381;</p>
                        <Button modificator={"card__btn"} text={"Add to cart"} onClick={(e) => addToCartClick(e, id)}></Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card