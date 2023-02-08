import React from 'react'
import contactsdecorate from "../img/contacts-decorate.png";

function Contacts() {
  return (
    <div className="contacts">
      <div className="contacts__left">
        <h2 className="section__title contacts__title text-color">Call our store and takeaway when it suits you best.</h2>
        <p className="contacts__text">Leo vel orci porta non pulvinar neque laoreet. Quis risus sed vulputate odio ut enim blandit volutpat maecenas. Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien. Semper auctor neque vitae tempus quam pellentesque nec.</p>
        <p className="contacts__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <a className="contacts__link btn" href="tel:+79876543210">+7 (987) 654 32-10</a>
      </div>
      <div className="contacts__right">
        <img className="contacts__img" src={contactsdecorate}/>
      </div>
    </div>
  )
}

export default Contacts