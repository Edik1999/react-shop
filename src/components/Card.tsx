import '../styles/components/card.sass';

import {useState, useEffect} from 'react'
import {useAppDispatch} from "../store";
import {cart} from '../store/slice/cartSlice';
import {saveProductLocal} from "../helpers/saveProductLocal";
import {useAppSelector} from "../store";

import Button from './Button';
import Counter from './Counter';
import {useTranslation} from "react-i18next";

interface IProps {
    id: number,
    title: string,
    image: string,
    renderImg: (arg0: string) => JSX.Element,
    price: number,
    type: string,
    click: (arg0: number) => void
}

function Card({id, title, image, renderImg, price, type, click}: IProps) {

    const [isInCart, setIsInCart] = useState(false);

    const state = useAppSelector(state => state)
    const dispatch = useAppDispatch()
    const { t } = useTranslation()

    useEffect(() => {
        state.cart.find((elem: { id: number; }) => elem.id === id) ? setIsInCart(true) : setIsInCart(false)
    }, [state.cart, id])

    const addToCartClick = (e: { stopPropagation: () => void; }) => {
        e.stopPropagation();
        dispatch(cart(id));
        saveProductLocal(id);
    }
    
    return (
        <div className={`card flex ${id} ${type}`} onClick={() => click(id)}>
            {renderImg(image)}
            <div className="card__content flex-x-between flex--column">
                <p className="card__name">{title}</p>
                <div className='card__footer flex-x-between-y-center'>
                    <p className="card__price text-color">{price} {t('currency')}</p>
                    {!isInCart
                        ?
                            <Button modifier="card-btn" text={t('AddToCart')} onClick={e => addToCartClick(e)}></Button>
                        :
                            <Counter count={state.cart.find((elem: { id: number; }) => elem.id === id) ? state.cart.find((elem: { id: number; }) => elem.id === id).count : 0} elementId={id}></Counter>
                    }   
                </div>
            </div>
        </div>
    )
}

export default Card