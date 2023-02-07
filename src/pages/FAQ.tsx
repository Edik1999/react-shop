import React from 'react'
import faqdecorate from "../img/faq-decorate.png";

function FAQ() {
  return (
    <div className="faq">
      <div className="faq__left">
        <img className="faq__img" src={faqdecorate}/>
      </div>
      <div className="faq__right">
        <h2 className="section__title faq-title text-color">Order online with our simple checkout.</h2>
        <p className="section__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p className="section__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500.</p>
      </div>
  </div>
  )
}

export default FAQ