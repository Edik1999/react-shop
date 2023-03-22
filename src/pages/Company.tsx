import companydecorate from "../img/company-decorate.webp";
import {Link} from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { CSSTransition } from 'react-transition-group';
import useAnimationState from "../hooks/useAnimationState";
import {useRef, useState} from "react";
import {imagesLoaded} from "../helpers/imagesLoaded";
import Loader from "../components/Loader";

export const Company = withAuthenticationRequired(() => {

    const animationState = useAnimationState();
    const nodeRef = useRef(null);

    const [imagesLoading, setImagesLoading] = useState(true)

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
                <div className="company" ref={nodeRef}>
                    <div className="company__left">
                        <h2 className="section__title text-color">The home of fresh products.</h2>
                        <p className="section__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500.</p>
                        <p className="section__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <Link to="/menu" className="btn home-btn">Menu</Link>
                    </div>
                    <div className="company__right" ref={elem => parent = elem as HTMLDivElement}>
                        <img className="company__img" src={companydecorate} alt="girl eating our food" onLoad={() => handleImageChange(parent)} onError={() => handleImageChange(parent)}/>
                    </div>
                </div>
            </CSSTransition>
        </>
    )
})