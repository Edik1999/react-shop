import React from 'react'
import burger from "../img/burger.png";

function Card() {
    return (
        <>
            <div className="card">
                <img className="card__image" src={burger} alt="" />
                <div className="card__content">
                    <div className="card__title">
                        <p className="card__name">Burger</p>
                        <p className="card__price">$ 9.20 USD</p>
                    </div>
                    <div className="card__descr">
                        <p className="card__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        <input className="card__counter" type="text" placeholder="1" max="10" />
                        <button className="card__btn">Add to card</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card