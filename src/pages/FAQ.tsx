import {createRef} from "react";
import faqdecorate from "../img/faq-decorate.webp";
import hiwdecorate1 from "../img/hiw-decorate-1.webp";
import hiwdecorate2 from "../img/hiw-decorate-2.webp";
import hiwdecorate3 from "../img/hiw-decorate-3.webp";
import {Link} from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { CSSTransition } from 'react-transition-group';
import useAnimationState from "../hooks/useAnimationState";

export const FAQ = withAuthenticationRequired(() => {

  const animationState = useAnimationState();
  const nodeRef = createRef<HTMLElement>();
  const secondNodeRef = createRef<HTMLElement>();

  return (
      <>
        <CSSTransition
            classNames="animation"
            in={animationState}
            timeout={700}
            mountOnEnter
            unmountOnExit
            nodeRef={nodeRef}
        >
          <section className="faq" ref={nodeRef}>
            <div className="faq__left">
              <img className="faq__img" src={faqdecorate} alt={''}/>
            </div>
            <div className="faq__right">
              <h2 className="section__title faq__title text-color">Order online with our simple checkout.</h2>
              <p className="faq__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <p className="faq__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500.</p>
            </div>
          </section>
        </CSSTransition>
        <CSSTransition
            classNames="animation"
            in={animationState}
            timeout={700}
            mountOnEnter
            unmountOnExit
            nodeRef={secondNodeRef}
        >
          <section className="howitworks" ref={secondNodeRef}>
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
            <Link to="/menu" className="btn home__btn">Take Order</Link>
          </section>
        </CSSTransition>
      </>
  )
})