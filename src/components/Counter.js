import '../styles/components/counter.sass'

function Counter({count}) {

    return (
        <>
            <div className="counter">
                <span className="counter__minus">-</span>
                <span className="counter__number">{count}</span>
                <span className="counter__plus">+</span>
            </div>
        </>
    )
}

export default Counter