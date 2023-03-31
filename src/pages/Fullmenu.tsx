import {useRef, useState} from "react";
import Card from "../components/Card";
import Search from "../components/Search";
import Button from '../components/Button';
import Modal from '../components/Modal';
import {withAuthenticationRequired} from '@auth0/auth0-react';
import Loader from "../components/Loader";
import {imagesLoaded} from "../helpers/imagesLoaded";
import {useAppSelector} from "../store";
import { CSSTransition } from 'react-transition-group';
import useAnimationState from "../hooks/useAnimationState";

export const Fullmenu = withAuthenticationRequired(() => {

    const state = useAppSelector(state => state);

    const [content, setContent] = useState(state.goods)
    const [activeSort, setActiveSort] = useState(1)
    const [priceSort, setPriceSort] = useState(1)
    const [modalState, setModalState] = useState(false)
    const [clickedCard, setClickedCard] = useState(1)
    const [imagesLoading, setImagesLoading] = useState(true)

    const animationState = useAnimationState();
    const nodeRef = useRef(null);

    const filterContent = (filterString: string) => state.goods.filter(el => el.title.toLowerCase().indexOf(filterString.toLowerCase()) > -1)

    const searchHandler = (filterString: string) => {
        setActiveSort(1)
        if (filterString.length > 0) {
            setContent(filterContent(filterString).length > 0 ? filterContent(filterString) : [])
        } else {
            setContent(state.goods)
        }
    }

    const sortingHandler = (sortingString: string) => {
        setPriceSort(1);
        setContent(state.goods.filter(el => el.type.toLowerCase().indexOf(sortingString.toLowerCase()) > -1))
        switch (sortingString) {
            case 'Pizza':
                setActiveSort(2)
                break;
            case 'Burger':
                setActiveSort(3)
                break;
            default:
                setActiveSort(4)
                break;
        }
    }

    const orderByPrice = () => {
        let copyContent = [...content];
        let sortedContent = [];
        if (priceSort === 1) {
            sortedContent = copyContent.sort((a, b) => a.price > b.price ? 1 : -1);
        } else if (priceSort === 2) {
            sortedContent = copyContent.sort((a, b) => a.price < b.price ? 1 : -1);
        } else if (priceSort === 3) {
            if (activeSort !== 1) {
                sortedContent = state.goods.filter(el => el.type.toLowerCase().indexOf(whichSort()?.toLowerCase()) > -1)
            } else {
                sortedContent = state.goods
            }
        }
        setActiveOrderByPrice();
        setContent(sortedContent);
    }

    const setActiveOrderByPrice = () => {
        switch (priceSort) {
            case 1:
                setPriceSort(2)
                break;
            case 2:
                setPriceSort(3)
                break;
            default:
                setPriceSort(1)
                break;
        }
    }

    const whichClass = (): string => {
        switch (priceSort) {
            case 2:
                return 'whiteDown'
            case 3:
                return 'whiteUp'
            default:
                return 'menu-btn--disabled'
        }
    }

    function whichSort() {
        switch (activeSort) {
            case 2:
                return 'Pizza'
            case 3:
                return 'Burger'
            case 4:
                return 'Roll'
            default:
                break;
        }
    }

    const cardClickHandler = (id: number) => {
      setClickedCard(id)
      setModalState(!modalState)
    }

    const closeModal = () => {
      setClickedCard(999)
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
                <h2 className="section__title text-color">Browse our menu</h2>
                <p className="section__text">
                  Use our menu to place an order online, or <span className="text-color">phone</span> our store <br className="breakLine"/> to place a
                  pickup order. Fast and fresh food.
                </p>
                <div className="menu__filter">
                  <Button modificator={`menu-btn ${activeSort !== 1 && 'menu-btn--disabled'}`} text={"Показать все"} onClick={() => {setContent(state.goods); setActiveSort(1); setPriceSort(1)}}></Button>
                  <Button modificator={`menu-btn ${activeSort !== 2 && 'menu-btn--disabled'}`} text={"Пицца"} onClick={() => sortingHandler('Pizza')}></Button>
                  <Button modificator={`menu-btn ${activeSort !== 3 && 'menu-btn--disabled'}`} text={"Бургеры"} onClick={() => sortingHandler('Burger')}></Button>
                  <Button modificator={`menu-btn ${activeSort !== 4 && 'menu-btn--disabled'}`} text={"Роллы"} onClick={() => sortingHandler('Roll')}></Button>
                  <Button modificator={`menu-btn sorting-btn ${whichClass()}`} text={"Price"} onClick={() => orderByPrice()}></Button>
                  <Search handler={searchHandler}></Search>
                </div>
                <ul className="card__wrap" ref={element => imagesParent = element as HTMLUListElement}>
                  {content.length > 0 ? (
                    content.map((el) => (
                      <Card key={el.id} id={el.id} title={el.title} image={el.image} renderImg={(image) => renderImage(image)} price={el.price} type={el.type} click={(id) => cardClickHandler(id)} />
                    ))
                  ) : (
                    <p className="section__text">Oops, try another search</p>
                  )}
                </ul>
                {clickedCard
                    ? <Modal isVisible={modalState} id={clickedCard} onClose={closeModal}></Modal>
                    : null
                }
              </section>
          </CSSTransition>
      </>
    )
  }
)