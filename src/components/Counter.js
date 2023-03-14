// import '../styles/components/counter.sass'
import { useAppDispatch } from "../store";
import {deleteSingleGood, addSingleGood, deleteFromCart} from '../store/slice/cartSlice';

function Counter({count, elementId, deleteHandler}) {
    const dispatch = useAppDispatch();

    const dec = (e) => {
        if(count > 1){
            dispatch(deleteSingleGood(elementId))
        }else{
            if(deleteHandler){
                deleteHandler(e, elementId)
            }else{
                dispatch(deleteFromCart(elementId))
            }
        }
    }

    const inc = () => dispatch(addSingleGood(elementId))

    return (
        <div className="counter" onClick={(e) => e.stopPropagation()}>
            <span className="counter__minus" onClick={(e) => dec(e)}>-</span>
            <span className="counter__number">{count}</span>
            <span className="counter__plus" onClick={() => inc()}>+</span>
        </div>
    )
}

export default Counter