import '../styles/pages/FAQ.sass';

import {Fragment, useRef, useState} from "react";
import { withAuthenticationRequired } from '@auth0/auth0-react';
import useAnimationState from "../hooks/useAnimationState";
import {imagesLoaded} from "../helpers/imagesLoaded";
import {useTranslation} from "react-i18next";

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
  const { t } = useTranslation();

  const [imagesLoading, setImagesLoading] = useState(true)

  const handleImageChange = (imagesParent: HTMLDivElement | HTMLUListElement) => {
    setImagesLoading(!imagesLoaded(imagesParent))
  }

  let parent: HTMLDivElement,
      parent2: HTMLUListElement;

  const items = [
    {
      src: hiwdecorate1,
      alt: t('firstStepAlt'),
      subtitle: t('firstStepSubtitle'),
      text: t('firstStepText'),
    },
    {
      src: hiwdecorate2,
      alt: t('secondStepAlt'),
      subtitle: t('secondStepSubtitle'),
      text: t('secondStepText'),
    },
    {
      src: hiwdecorate3,
      alt: t('thirdStepAlt'),
      subtitle: t('thirdStepSubtitle'),
      text: t('thirdStepText'),
      last: true,
    },
  ]

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
          <section className="faq flex-x-between-y-center" ref={nodeRef}>
            <div className="faq__left" ref={elem => parent = elem as HTMLDivElement}>
              <img className="faq__img" src={faqdecorate} alt={t('faqImgAlt')} onLoad={() => handleImageChange(parent)} onError={() => handleImageChange(parent)}/>
            </div>
            <div className="faq__right">
              <h2 className="faq__title section__title text-color">{t('faqTitle')}</h2>
              <p className="faq__text section__text">{t('faqText1')}</p>
              <p className="faq__text section__text">{t('faqText2')}</p>
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
            <h2 className="howitworks__title section__title text-color">{t('howitworksTitle')}</h2>
            <ul className="howitworks__list flex"  ref={elem => parent2 = elem as HTMLUListElement}>
              {items.map(item => (
                  <Fragment key={item.src}>
                    <li className="howitworks__item flex-y-center flex--column">
                      <img className="howitworks__img" src={item.src} alt={item.alt} onLoad={() => handleImageChange(parent2)} onError={() => handleImageChange(parent2)}/>
                      <h3 className="howitworks__subtitle">{item.subtitle}</h3>
                      <p className="howitworks__text section__text">{item.text}</p>
                    </li>
                    {!item.last &&
                        <li className="howitworks__item flex-y-center flex--column">
                          <div className="howitworks__line"></div>
                        </li>
                    }
                  </Fragment>
                ))}
            </ul>
            <Link to="/menu" className="btn home-btn">{t('makeOrder')}</Link>
          </section>
        </CSSTransition>
      </>
  )
})