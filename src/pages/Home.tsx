import React, { useEffect } from "react";
// import Button from "../components/Button";
import Loader from "../components/Loader";
// import {Link} from 'react-router-dom';
import trustpilot from "../img/trustpilot.png";
import orderdecorate from "../img/orderdecorate.png";
import { useGetGoodsQuery } from "../store/mockAPI/mockApi";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, useAppDispatch } from "../store";
import { setGoods } from "../store/mockAPI/goodsSlice";
// import type { IGoods } from "../models/models";

function Home() {
  const { isLoading, isError, data} = useGetGoodsQuery("");

  const state = useSelector((state: RootState) => state)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (data) dispatch(setGoods(data))
  }, [data])

  return (
    <>
      {isLoading && <Loader></Loader>}

      {isError ? (
        <p>Oops, something went wrong...</p>
      ) : (
        <>
          <section className="order">
            <div className="order__left">
              <h1 className="section__title">
                Beautiful food & takeaway,{" "}
                <span className="text-color">delivered</span> to your door.
              </h1>
              <p className="section__text">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500.
              </p>
              <button className="order__btn">Place an Order</button>
              <img className="order__img" src={trustpilot} />
              <p className="order__text">
                <span className="text-color">4.8 out of 5</span> based on 2000+
                reviews
              </p>
            </div>
            <div className="order__right">
              <img src={orderdecorate} />
            </div>
          </section>

          <section className="aboutus">
            {state.setGoods.map(el => <p key={Math.random()}>{el.title}</p>)}
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
