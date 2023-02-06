import React from 'react'
import burger from "../img/burger.png";

function Card({title, image, price, text}) {
    // console.log('render')
    return (
        <>
            <div className="card">
                <img className="card__image" src={image} alt="" />
                <div className="card__content">
                    <div className="card__title">
                        <p className="card__name">{title}</p>
                        <p className="card__price">{price}</p>
                    </div>
                    <div className="card__descr">
                        <p className="card__text">{text}</p>
                        <input className="card__counter" type="text" placeholder="1" max="10" />
                        <button className="card__btn">Add to card</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card