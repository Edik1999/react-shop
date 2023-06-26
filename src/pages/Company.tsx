import '../styles/pages/Company.sass';

import { withAuthenticationRequired } from '@auth0/auth0-react';
import useAnimationState from "../hooks/useAnimationState";
import {useRef, useState} from "react";
import {imagesLoaded} from "../helpers/imagesLoaded";
import {useTranslation} from "react-i18next";

import { CSSTransition } from 'react-transition-group';
import {Link} from 'react-router-dom';
import Loader from "../components/Loader";

import companydecorate from "../img/company-decorate.webp";

export const Company = withAuthenticationRequired(() => {

    const animationState = useAnimationState();
    const nodeRef = useRef(null);
    const { t } = useTranslation();

    const [imagesLoading, setImagesLoading] = useState(true)

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
                <section className="company flex-x-around-y-center" ref={nodeRef}>
                    <div className="company__left">
                        <h2 className="company__title section__title text-color">{t('companyTitle')}</h2>
                        <p className="company__text section__text">{t('companyText')}</p>
                        <p className="company__text section__text">{t('companyText2')}</p>
                        <Link to="/menu" className="btn home-btn">{t('menu')}</Link>
                    </div>
                    <div className="company__right" ref={elem => parent = elem as HTMLDivElement}>
                        <img className="company__img" src={companydecorate} alt={t('companyImgAlt')} onLoad={() => handleImageChange(parent)} onError={() => handleImageChange(parent)}/>
                    </div>
                </section>
            </CSSTransition>
        </>
    )
})