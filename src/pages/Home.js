import React, { useEffect } from "react";
// import Button from "../components/Button";
import Loader from "../components/Loader";
// import {Link} from 'react-router-dom';
import trustpilot from "../img/trustpilot.png";
import homedecorate from "../img/home-decorate.png";
import clientavatar from "../img/client-avatar.png";
import Button from '../components/Button';
import { useGetGoodsQuery } from "../store/mockAPI/mockApi";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, useAppDispatch } from "../store";
import { setGoods } from "../store/mockAPI/goodsSlice";
// import type { IGoods } from "../models/models";

function Home() {
  const { isLoading, isError, data } = useGetGoodsQuery("");

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (data) dispatch(setGoods(data))
  }, [data])

  if (isLoading) {
    document.querySelector('body').style.overflow = 'hidden';
  } else {
    document.querySelector('body').style.overflowY = 'visible';
  }

  return (
    <>
      {isLoading && <Loader></Loader>}

      {isError ? (
        <p>Oops, something went wrong...</p>
      ) : (
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
              <Button modificator={"home__btn"} text={"Burgers"}></Button>
              <img className="home__img" src={trustpilot} />
              <p className="home__text">
                <span className="text-color">4.8 out of 5</span> based on 2000+
                reviews
              </p>
            </div>
            <div className="home__right">
              <img src={homedecorate} />
            </div>
          </section>

          <section className="clients">
            <h2 className="clients__title text-color">Clients</h2>
            <ul className="clients__wrap">
              <li className="client__card">
                <p className="client__text">Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit odio dignissim qui blandit molestie consequat.</p>
                <div className="client__info">
                  <img className="client__avatar" src={clientavatar} />
                  <div className="client__descr">
                    <p className="client__name text-color">John Armstrong</p>
                    <p className="client__role">Customer</p>
                  </div>
                </div>
              </li>
              <li className="client__card">
                <p className="client__text">Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit odio dignissim qui blandit molestie consequat.</p>
                <div className="client__info">
                  <img className="client__avatar" src={clientavatar} />
                  <div className="client__descr">
                    <p className="client__name text-color">John Armstrong</p>
                    <p className="client__role">Customer</p>
                  </div>
                </div>
              </li>
              <li className="client__card">
                <p className="client__text">Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit odio dignissim qui blandit molestie consequat.</p>
                <div className="client__info">
                  <img className="client__avatar" src={clientavatar} />
                  <div className="client__descr">
                    <p className="client__name text-color">John Armstrong</p>
                    <p className="client__role">Customer</p>
                  </div>
                </div>
              </li>
            </ul>
          </section>

          <section className="howitworks"></section>

          <section className="menu"></section>

          <section className="support"></section>
        </>
      )}
    </>
  );
}

export default Home;
