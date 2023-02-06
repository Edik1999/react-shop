import React, { useEffect } from "react";
// import Button from "../components/Button";
import Loader from "../components/Loader";
// import {Link} from 'react-router-dom';
import trustpilot from "../img/trustpilot.png";
import homedecorate from "../img/homedecorate.png";
import Button from '../components/Button';
import { useGetGoodsQuery } from "../store/mockAPI/mockApi";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, useAppDispatch } from "../store";
import { setGoods } from "../store/mockAPI/goodsSlice";
// import type { IGoods } from "../models/models";

function Home() {
  const { isLoading, isError, data} = useGetGoodsQuery("");

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (data) dispatch(setGoods(data))
  }, [data])

  if(isLoading) {
    document.querySelector('body').style.overflow = 'hidden';
  }else{
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
              <h1 className="section__title home__title">
                Beautiful food & takeaway, <span className="text-color">delivered</span> to your door.
              </h1>
              <p className="section__text">
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
            
          <section className="menu">
          </section>

          <section className="howitworks"></section>

          <section className="menu"></section>

          <section className="faq"></section>

          <section className="contacts"></section>

          <section className="support"></section>
        </>
      )}
    </>
  );
}

export default Home;
