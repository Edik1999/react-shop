import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Button from "../components/Button";
import { CSSTransition } from 'react-transition-group';
import useAnimationState from "../hooks/useAnimationState";
import {createRef} from "react";

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
                 <img src={user?.picture} alt={user?.name} />
                 <div>
                     <h2>{user?.name}</h2>
                     <p>{user?.email}</p>
                 </div>
                 <Button modificator={""} text={"Log Out"} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}></Button>
             </section>
         </CSSTransition>
     )
 })