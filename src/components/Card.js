import React from 'react'
import burger from "../img/burger.png";
import Button from '../components/Button';
import { Link } from 'react-router-dom';

function Card({id, title, image, price, text, type, click}) {

    return (
        <>
            <div className={`card ${id} ${type}`} onClick={() => click(id)}>
                <img className="card__image" src={image} alt="" />
                <div className="card__content">
                    <div className="card__title">
                        <p className="card__name">{title}</p>
                        
                    </div>
                    <p className="card__text">{text}</p>
                    <div className='card__footer'>
                        <p className="card__price text-color">{price} &#8381;</p>
                        <Link to="/"><Button modificator={"card__btn"} text={"Add to card"}></Button></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card