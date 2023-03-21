import Button from '../components/Button';
import contactsdecorate from "../img/contacts-decorate.webp";
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { CSSTransition } from 'react-transition-group';
import useAnimationState from "../hooks/useAnimationState";
import {createRef, useState} from "react";
import {imagesLoaded} from "../helpers/imagesLoaded";
import Loader from "../components/Loader";

export const Contacts = withAuthenticationRequired(() => {

  const animationState = useAnimationState();
  const nodeRef = createRef<HTMLElement>();
  const secondNodeRef = createRef<HTMLElement>();

  const [imagesLoading, setImagesLoading] = useState(true)

  const clickHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
  }

  const handleImageChange = (imagesParent: HTMLDivElement): void => {
    setImagesLoading(!imagesLoaded(imagesParent))
  }

  let parent: HTMLDivElement;

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
        <section className="contacts" ref={nodeRef}>
          <div className="contacts__left">
            <h2 className="section__title text-color">Call our store and takeaway when it suits you best.</h2>
            <p className="section__text">Leo vel orci porta non pulvinar neque laoreet. Quis risus sed vulputate odio ut enim blandit volutpat maecenas. Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien. Semper auctor neque vitae tempus quam pellentesque nec.</p>
            <p className="section__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <a className="contacts__link btn" href="tel:+79876543210">+7 (987) 654 32-10</a>
          </div>
          <div className="contacts__right" ref={elem => parent = elem as HTMLDivElement}>
            <img className="contacts__img" src={contactsdecorate} alt="our place" onLoad={() => handleImageChange(parent)} onError={() => handleImageChange(parent)}/>
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
        <section className="feedback" ref={secondNodeRef}>
          <h2 className="section__title text-color">Here you can post your<br/> feedback about us.</h2>
          <form className="form">
            <div className="form__top">
              <div className="form__left">
                <input className="form__input" type="text" placeholder="Name" required />
                <input className="form__input" type="email" placeholder="E-mail" />
                <input className="form__input" type="tel" placeholder="Phone" />
              </div>
              <div className="form__right">
                <textarea className="form__textarea" placeholder="Comment" required></textarea>
              </div>
            </div>
            <div className="form__bottom">
              <div className="form__wrapper">
                <Button text={"Post"} modificator={"form-btn"} onClick={(e: React.MouseEvent<HTMLElement>) => clickHandler(e)}></Button>
                <label className="form__check">
                  <input type="checkbox" required /> I agree with the <span className="text-color">user agreement</span>
                </label>
              </div>
            </div>
          </form>
          <p className="section__text">Thank you for your feedback</p>
        </section>
      </CSSTransition>
    </>
  )
})
