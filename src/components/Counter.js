import '../styles/components/counter.sass'
import { useAppDispatch } from "../store";
import { useSelector } from "react-redux";
import {deleteSingleGood, addSingleGood} from '../store/slice/cartSlice';

function Counter({count, elementId}) {
    const dispatch = useAppDispatch();
    const state = useSelector((state) => state);

    const dec = () => {
        let deletedId = state.cart.findIndex((el) => el.id === elementId)
        dispatch(deleteSingleGood(deletedId))
    }

    const inc = () => {
        let incrementedId = state.cart.findIndex((el) => el.id === elementId)
        dispatch(addSingleGood(incrementedId))
    }

    return (
        <>
            <div className="counter">
                <span className="counter__minus" onClick={() => dec()}>-</span>
                <span className="counter__number">{count}</span>
                <span className="counter__plus" onClick={() => inc()}>+</span>
            </div>
        </>
    )
}

export default Counter