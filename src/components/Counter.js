import '../styles/components/counter.sass'
import { useAppDispatch } from "../store";
// import { useSelector } from "react-redux";
import {deleteSingleGood, addSingleGood, deleteFromCart} from '../store/slice/cartSlice';

function Counter({count, elementId}) {
    const dispatch = useAppDispatch();

    const dec = () => count > 1 ? dispatch(deleteSingleGood(elementId)) : dispatch(deleteFromCart(elementId))

    const inc = () => dispatch(addSingleGood(elementId))

    return (
        <div className="counter" onClick={(e) => e.stopPropagation()}>
            <span className="counter__minus" onClick={() => dec()}>-</span>
            <span className="counter__number">{count}</span>
            <span className="counter__plus" onClick={() => inc()}>+</span>
        </div>
    )
}

export default Counter