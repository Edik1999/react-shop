import companydecorate from "../img/company-decorate.webp";
import {Link} from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react'

export const Company = withAuthenticationRequired(() => {
    return (
      <div className="company">
        <div className="company__left">
          <h2 className="section__title text-color">The home of fresh products.</h2>
          <p className="company__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500.</p>
          <p className="company__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <Link to="/menu" className="btn home__btn">Menu</Link>
        </div>
        <div className="company__right">
          <img className="company__img" src={companydecorate} alt={''}/>
        </div>
      </div>
    )
})