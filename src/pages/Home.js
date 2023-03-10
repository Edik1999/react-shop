import trustpilot from "../img/trustpilot.webp";
import homedecorate from "../img/home-decorate.webp";
import clientavatar from "../img/client-avatar.webp";
import {Link} from 'react-router-dom';

function Home() {

  return (
    <>
      <section className="home">
        <div className="home__left">
          <h1 className="home__title">
            Beautiful food & takeaway, <span className="text-color">delivered</span> to your door.
          </h1>
          <p className="home__text">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy
            text ever since the 1500.
          </p>
          <Link to="/menu" className="btn home__btn">To Menu</Link>
          <div className="home__rate">
            <img className="rate__img" src={trustpilot} alt={''}/>
            <p className="rate__text">
              <span className="text-color">4.8 out of 5</span> based on 2000+
              reviews
            </p>
          </div>
        </div>
        <div className="home__right">
          <img src={homedecorate} alt={''}/>
        </div>
      </section>

      <section className="clients">
        <h2 className="clients__title text-color">Clients</h2>
        <ul className="clients__wrap">
          <li className="client__card">
            <p className="client__text">Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit odio dignissim qui blandit molestie consequat.</p>
            <div className="client__info">
              <img className="client__avatar" src={clientavatar} alt={''}/>
              <div className="client__descr">
                <p className="client__name text-color">John Armstrong</p>
                <p className="client__role">Customer</p>
              </div>
            </div>
          </li>
          <li className="client__card">
            <p className="client__text">Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit odio dignissim qui blandit molestie consequat.</p>
            <div className="client__info">
              <img className="client__avatar" src={clientavatar} alt={''}/>
              <div className="client__descr">
                <p className="client__name text-color">John Armstrong</p>
                <p className="client__role">Customer</p>
              </div>
            </div>
          </li>
          <li className="client__card">
            <p className="client__text">Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit odio dignissim qui blandit molestie consequat.</p>
            <div className="client__info">
              <img className="client__avatar" src={clientavatar} alt={''}/>
              <div className="client__descr">
                <p className="client__name text-color">John Armstrong</p>
                <p className="client__role">Customer</p>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </>
  );
}

export default Home;
