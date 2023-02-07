import React from 'react'
import companydecorate from "../img/company-decorate.png";
import Button from '../components/Button';

function Company() {
  return (
      <div className="company">
        <div className="company__left">
          <h2 className="section__title company-title text-color">The home of fresh products.</h2>
          <p className="section__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500.</p>
          <p className="section__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <Button modificator={"home__btn"} text={"Menu"} onClick></Button>
        </div>
        <div className="company__right">
          <img className="company__img" src={companydecorate}/>
        </div>
      </div>
  )
}

export default Company