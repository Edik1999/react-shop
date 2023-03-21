import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Button from "../components/Button";
import { CSSTransition } from 'react-transition-group';
import useAnimationState from "../hooks/useAnimationState";
import {createRef} from "react";
import emptycart from "../img/empty-cart.png";

 export const Profile = withAuthenticationRequired(() => {
     
     const {logout, user} = useAuth0();

     const animationState = useAnimationState();
     const nodeRef = createRef<HTMLElement>();

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
                    <Button modificator={""} text={"Log Out"} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}></Button>
                 </div>
                 <div className='profile__history'>
                    <h2 className='section__title text-color'>История заказов</h2>
                    <img className="history__img" src={emptycart} alt="Cart is empty"/>
                    <p className="section__text">Ваша история заказов пуста!</p>
                 </div>
             </section>
         </CSSTransition>
     )
 })