// import '../styles/components/counter.sass'
import { useAppDispatch } from "../store";
import {deleteSingleGood, addSingleGood, deleteFromCart} from '../store/slice/cartSlice';

function Counter({count, elementId, deleteHandler}) {
    const dispatch = useAppDispatch();

    let localStorageCart,
        elem;

    if(localStorage.getItem('cart')){
        localStorageCart = JSON.parse(localStorage.getItem('cart'));
        elem = localStorageCart.filter(el => el.id === elementId)[0];
    }

    const dec = (e) => {
        if(count > 1){
            dispatch(deleteSingleGood(elementId))
            elem.count -= 1;
            localStorage.setItem('cart', JSON.stringify(localStorageCart));

        }else{
            localStorage.setItem('cart', JSON.stringify(localStorageCart.filter(el => el.id !== elementId)));
            if(localStorage.getItem('cart') === '[]') localStorage.removeItem('cart')

            if(deleteHandler){
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
            <span className="counter__minus" onClick={(e) => dec(e)}>-</span>
            <span className="counter__number">{count}</span>
            <span className="counter__plus" onClick={() => inc()}>+</span>
        </div>
    )
}

export default Counter