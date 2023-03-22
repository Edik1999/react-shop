import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Button from "../components/Button";
import { CSSTransition } from 'react-transition-group';
import useAnimationState from "../hooks/useAnimationState";
import {useRef} from "react";
import emptycart from "../img/empty-cart.png";
import { Link } from 'react-router-dom';

 export const Profile = withAuthenticationRequired(() => {
     
     const {logout, user} = useAuth0();

     const animationState = useAnimationState();
     const nodeRef = useRef(null);

     console.log(user);

     return (
         <CSSTransition
             classNames="animation"
             in={animationState}
             timeout={700}
             mountOnEnter
             unmountOnExit
             nodeRef={nodeRef}
         >
            <section className='profile' ref={nodeRef}>
                 <div className='profile__user'>
                    <img className='user__photo' src={user?.picture} alt={user?.name} />
                    <h3 className='user__name'>{user?.name}</h3>
                    <p className='user__email'>{user?.email}</p>
                    <Button modificator={"cart-btn"} text={"Log Out"} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}></Button>
                 </div>
                 <div className='profile__history'>
                    <h2 className='section__title text-color'>История заказов</h2>
                    <img className="history__img" src={emptycart} alt="Cart is empty"/>
                    <p className="section__text">Ваша история заказов пуста!</p>
                    <Link to="/menu" className="btn home-btn">Сделать заказ</Link>
                 </div>
             </section>
         </CSSTransition>
     )
 })