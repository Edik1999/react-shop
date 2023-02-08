import '../styles/components/counter.sass'

function Counter() {

    return (
        <>
            <div className="counter">
                <span className="counter__minus">-</span>
                <span className="counter__number">1</span>
                <span className="counter__plus">+</span>
            </div>
        </>
    )
}

export default Counter