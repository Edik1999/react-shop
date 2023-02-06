import React from 'react'
import burger from "../img/burger.png";
import Button from '../components/Button';
import { Link } from 'react-router-dom';

function Card({title, image, price, text}) {
    // console.log('render')
    return (
        <>
            <div className="card">
                <img className="card__image" src={image} alt="" />
                <div className="card__content">
                    <div className="card__title">
                        <p className="card__name">{title}</p>
                        <p className="card__price text-color">{price}</p>
                    </div>
                    <p className="card__text">{text}</p>
                    <Link to="/"><Button modificator={"card__btn"} text={"Add to card"}></Button></Link>
                </div>
            </div>
        </>
    )
}

export default Card