import '../styles/pages/Contacts.sass';

import {withAuthenticationRequired} from '@auth0/auth0-react';
import useAnimationState from "../hooks/useAnimationState";
import {useState, MouseEvent, useRef, FocusEvent} from "react";
import {imagesLoaded} from "../helpers/imagesLoaded";
import {addDoc, collection, Firestore} from "firebase/firestore";
import {useAppSelector} from "../store";

import { CSSTransition } from 'react-transition-group';
import { PatternFormat } from 'react-number-format';
import Button from '../components/Button';
import Input from '../components/Input';
import Loader from "../components/Loader";

import contactsdecorate from "../img/contacts-decorate.webp";

export const Contacts = withAuthenticationRequired(({db}: {db: Firestore}) => {

  const animationState = useAnimationState();
  const nodeRef = useRef(null);
  const secondNodeRef = useRef(null);
  const state = useAppSelector(state => state.user);

  const [imagesLoading, setImagesLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isFormSent, setIsFormSent] = useState(false);

  function sendForm(form: HTMLFormElement){
    const formData = new FormData(form)
    const name = formData.get('name')
    const email = formData.get('email')
    const phone = formData.get('phone')
    const message = formData.get('message')

    addDoc(collection(db, "feedback"), {
      name: name,
      email: email,
      phone: phone,
      message: message,
      date: new Date()
    }).then(() => console.log('form was sent'))
  }

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
        setError(true)
        input.classList.add('error')
        setTimeout(() => {
          setError(false)
        }, 5000)
      }
    }

    if (!checkbox.checked) {
      allGood = false
      setError(true)
      checkboxLabel.classList.add('error')
      setTimeout(() => {
        setError(false)
      }, 5000)
    }

    if (message.value === '') {
      allGood = false
      setError(true)
      message.classList.add('error')
      setTimeout(() => {
        setError(false)
      }, 5000)
    }

    if(allGood) {
      sendForm(form)
      setIsFormSent(true)
      // window.scrollTo(0, window.scrollY - 500);
      setTimeout(() => {
        setError(false)
      }, 5000)
    }
  }

  const clickHandler = (e: FocusEvent<HTMLInputElement, Element> | FocusEvent<HTMLTextAreaElement, Element> | MouseEvent<HTMLLabelElement, globalThis.MouseEvent>) => {
    if(e.target instanceof Element) e.target.classList.remove('error');
  }

  const handleImageChange = (imagesParent: HTMLDivElement) => {
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
            <h2 className="contacts__title section__title text-color">Call our store and takeaway when it suits you best.</h2>
            <p className="contacts__text section__text">Leo vel orci porta non pulvinar neque laoreet. Quis risus sed vulputate odio ut enim blandit volutpat maecenas. Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien. Semper auctor neque vitae tempus quam pellentesque nec.</p>
            <p className="contacts__text section__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <a className="contacts__link contacts-btn btn" href="tel:+79876543210">+7 (987) 654 32-10</a>
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
        <section className={`feedback ${isFormSent && 'feedback--form-sent'} ${error && 'feedback--form-error'}`} ref={secondNodeRef}>
          {!isFormSent
              ? <>
                  <h2 className="feedback__title section__title text-color">Here you can post your<br/> feedback about us.</h2>
                  <form className={`feedback__form form ${error && 'feedback__form--error'}`}>
                    <div className="form__top">
                      <div className="form__left">
                        <Input name="name" type="text" placeholder="Name" defaultValue={state.name ? state.name : ''} modifier='form__input' onFocus={(e) => clickHandler(e)}/>
                        <Input name="email" type="email" placeholder="E-mail" defaultValue={state.email ? state.email : ''} modifier='form__input' onFocus={(e) => clickHandler(e)}/>
                        <PatternFormat value={state.phone ? state.phone : ''} format="+7 (###) ### ## ##" mask="_" className="form__input input" type="tel" placeholder="Phone" onFocus={(e) => clickHandler(e)}/>
                      </div>
                      <div className="form__right">
                        <textarea className="form__textarea input input--textarea" name="message" placeholder="Comment" rows={3} onFocus={(e) => clickHandler(e)}></textarea>
                      </div>
                    </div>
                    {error && <p className="form__error form__text section__text">Все поля должны быть заполнены !</p>}
                    <div className="form__bottom">
                      <div className="form__wrapper">
                        <Button text="Post" modifier="form-btn" onClick={(e) => formSubmitHandler(e)}></Button>
                        <label className="form__check form__text section__text" onClick={(e) => clickHandler(e)}>
                          <input className="form__checkbox" type="checkbox"/> I agree with the <span className="text-color">user agreement</span>
                        </label>
                      </div>
                    </div>
                  </form>
                </>

              : <h1 className="feedback__title feedback__title--success section__title text-color">Thank you for your feedback</h1>
          }
        </section>
      </CSSTransition>
    </>
  )
})
