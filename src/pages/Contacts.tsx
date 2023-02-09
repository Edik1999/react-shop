import React from 'react'
import Button from '../components/Button';
import contactsdecorate from "../img/contacts-decorate.png";

function Contacts() {
  return (
    <div>
      <section className="contacts">
        <div className="contacts__left">
          <h2 className="section__title contacts__title text-color">Call our store and takeaway when it suits you best.</h2>
          <p className="contacts__text">Leo vel orci porta non pulvinar neque laoreet. Quis risus sed vulputate odio ut enim blandit volutpat maecenas. Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien. Semper auctor neque vitae tempus quam pellentesque nec.</p>
          <p className="contacts__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <a className="contacts__link btn page-btn" href="tel:+79876543210">+7 (987) 654 32-10</a>
        </div>
        <div className="contacts__right">
          <img className="contacts__img" src={contactsdecorate} alt={''}/>
        </div>
      </section>

      <section className="feedback">
        <h2 className="feedback__title text-color">Here you can post your<br></br> feedback about us.</h2>
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
              <Button text={"Post"} modificator={"form-btn page-btn"} onClick={""}></Button>
              <label className="form__check">
                <input type="checkbox" required /> I agree with the <span className="text-color">user agreement</span>
              </label>
            </div>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Contacts