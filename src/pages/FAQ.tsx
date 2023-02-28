import React from 'react'
import faqdecorate from "../img/faq-decorate.png";
import hiwdecorate1 from "../img/hiw-decorate-1.png";
import hiwdecorate2 from "../img/hiw-decorate-2.png";
import hiwdecorate3 from "../img/hiw-decorate-3.png";
import Button from '../components/Button';
import {Link} from 'react-router-dom';

function FAQ() {
  return (

    <div>
      <section className="faq">
        <div className="faq__left">
          <img className="faq__img" src={faqdecorate} alt={''}/>
        </div>
        <div className="faq__right">
          <h2 className="section__title faq__title text-color">Order online with our simple checkout.</h2>
          <p className="faq__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p className="faq__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500.</p>
        </div>
      </section>

      <section className="howitworks">
        <h2 className="section__title howitworks__title text-color">How it works.</h2>
        <ul className="howitworks__list">
          <li className="howitworks__item">
            <img className="howitworks__img" src={hiwdecorate1} alt={''}/>
            <p className="howitworks__subtitle">Adapt your menu items</p>
            <p className="howitworks__text">Easily adapt your menu using the webflow CMS and allow customers to browse your items.</p>
          </li>
          <li className="howitworks__item">
            <div className="howitworks__item-border"></div>
          </li>
          <li className="howitworks__item">
            <img className="howitworks__img" src={hiwdecorate2} alt={''}/>
            <p className="howitworks__subtitle">Accept online orders & takeout</p>
            <p className="howitworks__text">Let your customers order and pay via the powerful ecommerce system, or simple let them call your store.</p>
          </li>
          <li className="howitworks__item">
            <div className="howitworks__item-border"></div>
          </li>
          <li className="howitworks__item">
            <img className="howitworks__img" src={hiwdecorate3} alt={''}/>
            <p className="howitworks__subtitle">Manage delivery or takeout</p>
            <p className="howitworks__text">Manage your own logistics and take orders simply through the ecommerce system.</p>
          </li>
        </ul>
        <Link to="/menu"><Button modificator="faq-btn page-btn" text="Take Order" onClick=""></Button></Link>
      </section>
    </div>

  )
}

export default FAQ