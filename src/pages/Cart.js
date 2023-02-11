import { useNavigate } from "react-router-dom";
import Counter from '../components/Counter';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteFromCart } from '../store/slice/cartSlice';
import { useAppDispatch } from "../store";

function Cart() {

  const state = useSelector((state) => state);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [pageContent, setPageContent] = useState([]);
  // setPageContent([]); /// не забыть убрать это!!!!!!!!!!

  const sum = () => {
    let prices = state.cart.map(el => el.price)
    const count = (arr) => arr.reduce((acc, num) => acc + Number(num), 0);
    return count(prices)
  }

  const deleteFromCartHandler = (id) => {
    dispatch(deleteFromCart(id));
  }

  const goToMenu = () => {
    navigate('/menu');
  }



  let IdArray = [];
  state.cart.map(el => IdArray.push(el.id))

  const countItems = {}; // здесь будет храниться промежуточный результат

  // получаем объект в котором ключ - это элемент массива, а значение - сколько раз встречается элемент в списке
  // например так будет выглядеть этот объект после цикла:
  // {1: 1, 3: 2, 4: 2, 7: 1, 15: 1, 19: 2}
  // 1 встречается в тексте 1 раз, 2 встречается 2 раза, 4 встречается 2 раза и так далее
  for (const item of IdArray) {
    // если элемент уже был, то прибавляем 1, если нет - устанавливаем 1
    countItems[item] = countItems[item] ? countItems[item] + 1 : 1;
  }

  let content = [];

  Object.keys(countItems).forEach(el => {
    content.push(state.cart.find((e) => e.id === el))
  })

  useEffect(() => {
    /// вот эту закоментить
    setPageContent(content)
  }, [state.cart])


  let contentCount = Object.values(countItems)

  return (
    <>
      <div className="cart-page">
        <h2 className="cart__title text-color">Cart</h2>
        <div className="cart__main">
          <ul className="cart__list">
            {pageContent.length > 0
              ?
              pageContent.map((el, ind) =>
                <li className="cart__item" key={Math.random()}>
                  <div className="cart__product">
                    <img className="cart__product-img" src={el.image} alt={''} />
                    <div className="cart__product-wrap">
                      <p className="cart__product-name">{el.title}</p>
                      <div className="cart__product-price-wraper">
                        <Counter count={contentCount[ind]}></Counter>
                        <p className="cart__product-price text-color">{el.price} ₽</p>
                      </div>
                      <div className="cart__product-delete" onClick={() => deleteFromCartHandler(el.id)}></div>
                    </div>
                  </div>
                </li>
              )
              :
              <>
                <li className="cart__empty">
                  Коразина пуста, вы можете сделать заказ в нашем меню
                </li>
                <li>
                  <Link to="/Home"><Button text={'На главную'} modificator={'btn menu-btn menu-btn--disabled'}></Button></Link>
                  <Button text={'Order now!'} modificator={'btn menu-btn menu-btn--disabled'} onClick={() => goToMenu()}></Button>
                </li>
              </>
            }
          </ul>
          <div className="cart__total">
            <p className="cart__total-title text-color">Order conditions</p>
            <div className="cart__total-count">
              <p className="cart__product-count">{state.cart.length} products</p>
              <p className="cart__total-price">Total <span className="text-color">{sum()} ₽</span> </p>
            </div>
            <Button text={"Place order"} modificator={'btn page-btn'}></Button>
          </div>
        </div>
      </div>
    </>

  )
}

export default Cart