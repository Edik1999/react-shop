import trustpilot from "../img/trustpilot.webp";
import homedecorate from "../img/home-decorate.webp";
import clientavatar from "../img/client-avatar.webp";
import {Link} from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import useAnimationState from "../hooks/useAnimationState";
import {useRef, useState} from "react";
import {imagesLoaded} from "../helpers/imagesLoaded";
import Loader from "../components/Loader";

function Home() {

  const animationState = useAnimationState();
  const nodeRef = useRef(null);
  const secondNodeRef = useRef(null);

  const [imagesLoading, setImagesLoading] = useState(true)

  const handleImageChange = (imagesParent: HTMLElement | HTMLDivElement | HTMLUListElement) => {
    setImagesLoading(!imagesLoaded(imagesParent))
  }

  let parent: HTMLDivElement,
      parent2: HTMLDivElement,
      parent3: HTMLUListElement;

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
        <section className="home" ref={nodeRef}>
          <div className="home__left">
            <h1 className="section__title">
              Beautiful food & takeaway, <span className="text-color">delivered</span> to your door.
            </h1>
            <p className="section__text">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy
              text ever since the 1500.
            </p>
            <Link to="/menu" className="btn home-btn">To Menu</Link>
            <div className="home__rate" ref={elem => parent = elem as HTMLDivElement}>
              <img className="rate__img" src={trustpilot} alt='Trustpilot' onLoad={() => handleImageChange(parent)} onError={() => handleImageChange(parent)}/>
              <p className="rate__text">
                <span className="text-color">4.8 out of 5</span> based on 2000+
                reviews
              </p>
            </div>
          </div>
          <div className="home__right" ref={elem => parent2 = elem as HTMLDivElement}>
            <img src={homedecorate} alt='food order' onLoad={() => handleImageChange(parent2)} onError={() => handleImageChange(parent2)}/>
          </div>
        </section>
      </CSSTransition>
      <CSSTransition
          classNames="animation"
          in={animationState}
          timeout={700}
          mountOnEnter
          unmountOnExit
          nodeRef={secondNodeRef}
      >
        <section className="clients" ref={secondNodeRef}>
          <h2 className="section__title text-color">Clients</h2>
          <ul className="clients__wrap" ref={elem => parent3 = elem as HTMLUListElement}>
            <li className="client__card">
              <p className="section__text">Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit odio dignissim qui blandit molestie consequat.</p>
              <div className="client__info">
                <img className="client__avatar" src={clientavatar} alt='client avatar' onLoad={() => handleImageChange(parent3)} onError={() => handleImageChange(parent3)}/>
                <div className="client__descr">
                  <p className="client__name text-color">John Armstrong</p>
                  <p className="client__role">Customer</p>
                </div>
              </div>
            </li>
            <li className="client__card">
              <p className="section__text">Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit odio dignissim qui blandit molestie consequat.</p>
              <div className="client__info">
                <img className="client__avatar" src={clientavatar} alt='client avatar' onLoad={() => handleImageChange(parent3)} onError={() => handleImageChange(parent3)}/>
                <div className="client__descr">
                  <p className="client__name text-color">John Armstrong</p>
                  <p className="client__role">Customer</p>
                </div>
              </div>
            </li>
            <li className="client__card">
              <p className="section__text">Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit odio dignissim qui blandit molestie consequat.</p>
              <div className="client__info">
                <img className="client__avatar" src={clientavatar} alt='client avatar' onLoad={() => handleImageChange(parent3)} onError={() => handleImageChange(parent3)}/>
                <div className="client__descr">
                  <p className="client__name text-color">John Armstrong</p>
                  <p className="client__role">Customer</p>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </CSSTransition>
    </>
  );
}

export default Home;