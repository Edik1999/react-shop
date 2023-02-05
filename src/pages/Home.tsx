import React from "react";
// import Button from "../components/Button";
import Loader from "../components/Loader";
// import {Link} from 'react-router-dom';

import { useGetGoodsQuery } from "../store/mockAPI/mockApi";

function Home() {
  const { isLoading, isError, data } = useGetGoodsQuery("");

  console.log(data);

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
                Beautiful food & takeaway, delivered to your door.
              </h1>
              <p className="section__text">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500.
              </p>
              <button className="order__btn">Place an Order</button>
              <img className="order__img" src="#" alt=""/>
              <p className="order__text"></p>
            </div>
          </section>

          <section className="aboutus"></section>

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
