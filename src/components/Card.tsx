import {useState, useEffect} from 'react'
import Button from './Button';
import Counter from './Counter';
import { useAppDispatch } from "../store";
import {cart} from '../store/slice/cartSlice';
import {saveProductLocal} from "../helpers/saveProductLocal";
import {useAppSelector} from "../store";

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

    const state = useAppSelector(state => state);
    const dispatch = useAppDispatch()

    useEffect(() => {
        state.cart.find((elem: { id: number; }) => elem.id === id) ? setIsInCart(true) : setIsInCart(false)
    }, [state.cart, id])

    const addToCartClick = (e: { stopPropagation: () => void; }) => {
        e.stopPropagation();
        dispatch(cart(id));
        saveProductLocal(String(id));
    }
    
    return (
        <div className={`card ${id} ${type}`} onClick={() => click(id)}>
            {renderImg(image)}
            <div className="card__content">
                <p className="card__name">{title}</p>
                <div className='card__footer'>
                    <p className="card__price text-color">{price} &#8381;</p>
                    {!isInCart 
                        ?
                            <Button modificator={"card__btn"} text={"Add to cart"} onClick={(e: any) => addToCartClick(e)}></Button>
                        :
                            <Counter count={state.cart.find((elem: { id: number; }) => elem.id === id) ? state.cart.find((elem: { id: number; }) => elem.id === id).count : 0} elementId={id}></Counter>
                    }   
                </div>
            </div>
        </div>
    )
}

export default Card