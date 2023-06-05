import '../styles/pages/Menu.sass';

import {useCallback, useRef, useState} from "react";
import {withAuthenticationRequired} from '@auth0/auth0-react';
import {imagesLoaded} from "../helpers/imagesLoaded";
import {useAppSelector} from "../store";
import useAnimationState from "../hooks/useAnimationState";

import { CSSTransition } from 'react-transition-group';
import Card from "../components/Card";
import Search from "../components/Search";
import Button from '../components/Button';
import Modal from '../components/Modal';
import Loader from "../components/Loader";

export const Menu = withAuthenticationRequired(() => {

    const state = useAppSelector(state => state);

    const [content, setContent] = useState(state.goods)
    const [activeSort, setActiveSort] = useState('all')
    const [priceSort, setPriceSort] = useState(1)
    const [priceSortButtonClass, setPriceSortButtonClass] = useState('menu-btn--disabled')
    const [modalState, setModalState] = useState(false)
    const [clickedCard, setClickedCard] = useState<number | null>(null)
    const [imagesLoading, setImagesLoading] = useState(true)

    const animationState = useAnimationState();
    const nodeRef = useRef(null);

    const searchHandler = useCallback((filterString: string) => {
        const filterContent = (filterString: string) => state.goods.filter((el: {title: string}) => el.title.toLowerCase().indexOf(filterString.toLowerCase()) > -1)

        setActiveSort('all')
        if (filterString.length > 0) {
            setContent(filterContent(filterString).length > 0 ? filterContent(filterString) : [])
        } else {
            setContent(state.goods)
        }
    }, [state.goods])

    const sortingHandler = (sortingString: string) => {
        setPriceSort(1);
        setContent(state.goods.filter(el => el.type.toLowerCase().indexOf(sortingString.toLowerCase()) > -1))
        setActiveSort(sortingString)
    }

    const orderByPrice = () => {
        let copyContent = [...content];
        let sortedContent = [];

        switch (priceSort){
            case 1:
                sortedContent = copyContent.sort((a, b) => a.price > b.price ? 1 : -1)
                setPriceSort(2)
                setPriceSortButtonClass('whiteDown')
                break;

            case 2:
                sortedContent = copyContent.sort((a, b) => a.price < b.price ? 1 : -1)
                setPriceSort(3)
                setPriceSortButtonClass('whiteUp')
                break;

            case 3:
                setPriceSort(1)
                setPriceSortButtonClass('menu-btn--disabled')
                activeSort !== 'all'
                    ? sortedContent = state.goods.filter(el => el.type.toLowerCase().indexOf(activeSort.toLowerCase()) > -1)
                    : sortedContent = state.goods
                break;
        }

        setContent(sortedContent);
    }

    const cardClickHandler = (id: number) => {
      setClickedCard(id)
      setModalState(!modalState)
    }

    const closeModal = () => {
      setClickedCard(null)
      setModalState(!modalState)
    }

    let imagesParent: HTMLElement;

    const handleImageChange = () => {
        setImagesLoading(!imagesLoaded(imagesParent))
    }

    const renderImage = (imageUrl: string) => {
        return (
            <img className="card__image" src={imageUrl} alt="product" onLoad={() => handleImageChange()} onError={() => handleImageChange()}/>
        );
    }

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
              <section className="menu" ref={nodeRef}>
                <h2 className="menu__title section__title text-color">Browse our menu</h2>
                <p className="menu__text section__text">
                  Use our menu to place an order online, or <span className="text-color">phone</span> our store <br className="breakLine"/> to place a
                  pickup order. Fast and fresh food.
                </p>
                <div className="menu__filter flex-x-center-y-center">
                  <Button modifier={`menu-btn ${activeSort !== 'all' && 'menu-btn--disabled'}`} text="Показать все" onClick={() => {setContent(state.goods); setActiveSort('all'); setPriceSort(1)}}></Button>
                  <Button modifier={`menu-btn ${activeSort !== 'Pizza' && 'menu-btn--disabled'}`} text="Пицца" onClick={() => sortingHandler('Pizza')}></Button>
                  <Button modifier={`menu-btn ${activeSort !== 'Burger' && 'menu-btn--disabled'}`} text="Бургеры" onClick={() => sortingHandler('Burger')}></Button>
                  <Button modifier={`menu-btn ${activeSort !== 'Roll' && 'menu-btn--disabled'}`} text="Роллы" onClick={() => sortingHandler('Roll')}></Button>
                  <Button modifier={`menu-btn sorting-btn ${priceSortButtonClass}`} text="Price" onClick={orderByPrice}></Button>
                  <Search handler={searchHandler}></Search>
                </div>
                <ul className="menu__wrap flex--wrap" ref={element => imagesParent = element as HTMLUListElement}>
                  {content.length > 0
                      ? content.map((el) =>
                          <Card key={el.id} id={el.id} title={el.title} image={el.image} renderImg={(image) => renderImage(image)} price={el.price} type={el.type} click={(id) => cardClickHandler(id)} />
                        )
                      : <p className="menu__text section__text">Oops, try another search</p>
                  }
                </ul>
                {clickedCard && <Modal isVisible={modalState} id={clickedCard} onClose={closeModal}></Modal>}
              </section>
          </CSSTransition>
      </>
    )
  }
)