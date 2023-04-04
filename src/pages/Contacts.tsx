import Button from '../components/Button';
import contactsdecorate from "../img/contacts-decorate.webp";
import {useAuth0, withAuthenticationRequired} from '@auth0/auth0-react';
import { CSSTransition } from 'react-transition-group';
import useAnimationState from "../hooks/useAnimationState";
import {useState, MouseEvent, useRef, FocusEvent} from "react";
import {imagesLoaded} from "../helpers/imagesLoaded";
import Loader from "../components/Loader";

export const Contacts = withAuthenticationRequired(() => {

  const animationState = useAnimationState();
  const nodeRef = useRef(null);
  const secondNodeRef = useRef(null);
  const {user} = useAuth0();

  const [imagesLoading, setImagesLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isSended, setIsSended] = useState(false);

  const formSubmitHandler = (e: { preventDefault: () => void; target: { closest: (arg0: string) => any; }; }) => {
    e.preventDefault();
    setError(false);
    const form = e.target.closest('form');
    const inputs = form.querySelectorAll('.form__input');
    const checkbox = form.querySelector('.form__checkbox');
    const checkboxLabel = form.querySelector('.form__check');
    const message = form.querySelector('.form__textarea');
    let allGood = true

    for (const input of inputs) {
      if (input.value === '') {
        allGood = false
        setError(true);
        input.classList.add('error');
      }
    }

    if (!checkbox.checked) {
      allGood = false
      setError(true);
      checkboxLabel.classList.add('error')
    }

    if (message.value === '') {
      allGood = false
      setError(true);
      message.classList.add('error');
    }

    if(allGood) setIsSended(true)
  }

  const clickHandler = (e: FocusEvent<HTMLInputElement, Element> | FocusEvent<HTMLTextAreaElement, Element> | MouseEvent<HTMLLabelElement, globalThis.MouseEvent>) => {
    // @ts-ignore
    e.target.classList.remove('error');
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
          { !isSended
              ?
                <>
                  <h2 className="section__title text-color">Here you can post your<br/> feedback about us.</h2>
                  <form className="form">
                    <div className="form__top">
                      <div className="form__left">
                        <input className="form__input feedback-form" type="text" placeholder="Name" defaultValue={user?.name !== user?.email ? user?.name : ''} required onFocus={(e) => clickHandler(e)} />
                        <input className="form__input feedback-form" type="email" placeholder="E-mail" defaultValue={user?.email} onFocus={(e) => clickHandler(e)}/>
                        <input className="form__input feedback-form" type="tel" placeholder="Phone" onFocus={(e) => clickHandler(e)}/>
                      </div>
                      <div className="form__right">
                        <textarea className="form__textarea feedback-form" placeholder="Comment" required onFocus={(e) => clickHandler(e)}></textarea>
                      </div>
                    </div>
                    {error && <p className="error-message">Все поля должны быть заполнены</p>}
                    <div className="form__bottom">
                      <div className="form__wrapper">
                        <Button text={"Post"} modificator={"form-btn"} onClick={(e) => formSubmitHandler(e)}></Button>
                        <label className="form__check" onClick={(e) => clickHandler(e)}>
                          <input className="form__checkbox" type="checkbox" required /> I agree with the <span className="text-color">user agreement</span>
                        </label>
                      </div>
                    </div>
                  </form>
                </>

              : <p className="section__text">Thank you for your feedback</p>
          }
        </section>
      </CSSTransition>
    </>
  )
})
