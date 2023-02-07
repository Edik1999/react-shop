import { Link } from "react-router-dom";
import burger from "../img/burger.png";
import Button from '../components/Button';

function Cart() {
  return (
    <>
    <div className="container">
      <div className="cart">
        <div className="cart__header">
          <h2 className="cart__title">Cart</h2>
          <p className="cart__product-count">2 products</p>
        </div>        
        <div className="cart__product">
          <div className="cart__product-img"><Link to="/"><img src={burger} alt="Image"/></Link></div>
          <div className="cart__product-wrap">
            <Link to="/"><p className="cart__product-name">Big Egg</p></Link>
            <p className="cart__product-price">399 €</p>
            <Link to="/"><div className="cart__product-delete">X</div></Link>
          </div>
        </div>
        <div className="cart__total">
          <p>Order conditions</p>
          <div className="cart__total-count">
            <p className="cart__product-count">2 products</p>
            <p className="cart__total-price">700 €</p>
          </div>
          <Button>Place order</Button>
        </div>
      </div>      
    </div>
    
    </>
    
  )
}

export default Cart