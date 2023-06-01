import '../styles/components/counter.sass';

import { MouseEvent } from "react";
import {useAppDispatch} from "../store";
import {deleteSingleGood, addSingleGood, deleteFromCart} from '../store/slice/cartSlice';

interface IProps {
    count: number,
    elementId: number | undefined,
    deleteHandler?: (arg0: any, arg1: number) => void
}

interface IStorage {
    id: number,
    count: number
}

function Counter({count, elementId, deleteHandler}: IProps) {
    const dispatch = useAppDispatch();

    let localStorageCart: IStorage[],
        elem: { count: number; };

    if (localStorage.getItem('cart')) {
        localStorageCart = JSON.parse(localStorage.getItem('cart') || "");
        elem = localStorageCart.filter(el => el.id === elementId)[0];
    }

    const dec = (e: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>) => {
        if(count > 1){
            dispatch(deleteSingleGood(elementId))
            elem.count -= 1;
            localStorage.setItem('cart', JSON.stringify(localStorageCart));

        }else{
            localStorage.setItem('cart', JSON.stringify(localStorageCart.filter(el => el.id !== elementId)));
            if(localStorage.getItem('cart') === '[]') localStorage.removeItem('cart')

            if(deleteHandler && elementId){
                deleteHandler(e, elementId)
            }else{
                dispatch(deleteFromCart(elementId))
            }
        }
    }

    const inc = () => {
        dispatch(addSingleGood(elementId))

        elem.count += 1;
        localStorage.setItem('cart', JSON.stringify(localStorageCart));
    }

    return (
        <div className="counter" onClick={(e) => e.stopPropagation()}>
            <span className="counter__minus" onClick={(e: MouseEvent<HTMLSpanElement>) => dec(e)}>&minus;</span>
            <span className="counter__number">{count}</span>
            <span className="counter__plus" onClick={() => inc()}>+</span>
        </div>
    )
}

export default Counter