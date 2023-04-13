import '../styles/pages/FAQ.sass';

import {useRef, useState} from "react";
import { withAuthenticationRequired } from '@auth0/auth0-react';
import useAnimationState from "../hooks/useAnimationState";
import {imagesLoaded} from "../helpers/imagesLoaded";

import {Link} from 'react-router-dom';
import Loader from "../components/Loader";
import { CSSTransition } from 'react-transition-group';

import faqdecorate from "../img/faq-decorate.webp";
import hiwdecorate1 from "../img/hiw-decorate-1.webp";
import hiwdecorate2 from "../img/hiw-decorate-2.webp";
import hiwdecorate3 from "../img/hiw-decorate-3.webp";

export const FAQ = withAuthenticationRequired(() => {

  const animationState = useAnimationState();
  const nodeRef = useRef(null);
  const secondNodeRef = useRef(null);

  const [imagesLoading, setImagesLoading] = useState(true)

  const handleImageChange = (imagesParent: HTMLDivElement | HTMLUListElement): void => {
    setImagesLoading(!imagesLoaded(imagesParent))
  }

  let parent: HTMLDivElement,
      parent2: HTMLUListElement;

  return (
      <>
        {imagesLoading && <Loader></Loader>}
        <CSSTransition
            classNames="animation"
            in={animationState}
            timeout={700}
            mountOnEnter
            unmountOnExit
            nodeRef={nodeRef}
        >
          <section className="faq" ref={nodeRef}>
            <div className="faq__left" ref={elem => parent = elem as HTMLDivElement}>
              <img className="faq__img" src={faqdecorate} alt="online order" onLoad={() => handleImageChange(parent)} onError={() => handleImageChange(parent)}/>
            </div>
            <div className="faq__right">
              <h2 className="section__title text-color">Order online with our simple checkout.</h2>
              <p className="section__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <p className="section__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500.</p>
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
            <h2 className="section__title text-color">How it works.</h2>
            <ul className="howitworks__list"  ref={elem => parent2 = elem as HTMLUListElement}>
              <li className="howitworks__item">
                <img className="howitworks__img" src={hiwdecorate1} alt="How it work. First step." onLoad={() => handleImageChange(parent2)} onError={() => handleImageChange(parent2)}/>
                <h3 className="howitworks__subtitle">Adapt your menu items</h3>
                <p className="section__text">Easily adapt your menu using the webflow CMS and allow customers to browse your items.</p>
              </li>
              <li className="howitworks__item">
                <div className="howitworks__item-border"></div>
              </li>
              <li className="howitworks__item">
                <img className="howitworks__img" src={hiwdecorate2} alt="How it work. Second step." onLoad={() => handleImageChange(parent2)} onError={() => handleImageChange(parent2)}/>
                <h3 className="howitworks__subtitle">Accept online orders & takeout</h3>
                <p className="section__text">Let your customers order and pay via the powerful ecommerce system, or simple let them call your store.</p>
              </li>
              <li className="howitworks__item">
                <div className="howitworks__item-border"></div>
              </li>
              <li className="howitworks__item">
                <img className="howitworks__img" src={hiwdecorate3} alt="How it work. Third step." onLoad={() => handleImageChange(parent2)} onError={() => handleImageChange(parent2)}/>
                <h3 className="howitworks__subtitle">Manage delivery or takeout</h3>
                <p className="section__text">Manage your own logistics and take orders simply through the ecommerce system.</p>
              </li>
            </ul>
            <Link to="/menu" className="btn home-btn">Take Order</Link>
          </section>
        </CSSTransition>
      </>
  )
})