import React from 'react'
import companydecorate from "../img/company-decorate.png";
import Button from '../components/Button';
import {Link} from 'react-router-dom';

function Company() {
  return (
      <div className="company">
        <div className="company__left">
          <h2 className="section__title text-color">The home of fresh products.</h2>
          <p className="company__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500.</p>
          <p className="company__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <Link to="/menu"><Button modificator={"home__btn page-btn"} text={"Menu"} onClick=""></Button></Link>
        </div>
        <div className="company__right">
          <img className="company__img" src={companydecorate} alt={''}/>
        </div>
      </div>
  )
}

export default Company