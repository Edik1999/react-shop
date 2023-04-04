import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Button from "../components/Button";
import { CSSTransition } from 'react-transition-group';
import useAnimationState from "../hooks/useAnimationState";
import {useEffect, useRef, useState} from "react";
import emptycart from "../img/empty-cart.webp";
import {Link} from 'react-router-dom';
import {collection, DocumentData, getDocs, query, where, orderBy} from "firebase/firestore";
import {useAppSelector} from "../store";
import Moment from 'react-moment';

export const Profile = withAuthenticationRequired(({db}: { db: any }) => {

    const {logout, user} = useAuth0();
    const animationState = useAnimationState();
    const nodeRef = useRef(null);
    const state = useAppSelector(state => state);

    const [orders, setOrders] = useState([]);

    async function check() {
        const q = query(collection(db, "orders"), where("user", "==", user?.email), orderBy('date', 'desc'));

        let appData: DocumentData[] = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            appData.push(doc.data());
        });

        return appData
    }

    useEffect(() => {
        check().then((res: any) => setOrders(res));
    }, [])


    return (
        <CSSTransition
            classNames="animation"
            in={animationState}
            timeout={700}
            mountOnEnter
            unmountOnExit
            nodeRef={nodeRef}
        >
            <section className='profile' ref={nodeRef}>
                <div className='profile__user'>
                    <img className='user__photo' src={user?.picture} alt={user?.name}/>
                    <h3 className='user__name'>{user?.name}</h3>
                    <p className='user__email'>{user?.email}</p>
                    <Button modificator={"cart-btn"} text={"Log Out"} onClick={() => logout({logoutParams: {returnTo: window.location.origin}})}></Button>
                </div>
                <div className='profile__history'>
                    <h2 className='section__title text-color'>История заказов</h2>
                    {orders.length > 0
                        ?   orders.map((el: any) => (
                                <div key={Math.random()} style={{marginBottom: 20}}>
                                    {el.items.map((elem: any) => (
                                        <p key={Math.random()}>
                                            <span>{state.goods.map(element => element.id === elem.id ? element.title : null)}</span>
                                            <span> x {elem.count}</span>
                                        </p>
                                    ))}
                                    <p>
                                        <span>Дата заказа: </span>
                                        <Moment format="YYYY-MM-DD HH:mm">{new Date(el.date.seconds * 1000)}</Moment>
                                    </p>
                                    <p>Сумма заказа: {el.sum}</p>
                                </div>
                            ))

                        :   <>
                                <img className="history__img" src={emptycart} alt="Cart is empty"/>
                                <p className="section__text">Ваша история заказов пуста!</p>
                                <Link to="/menu" className="btn home-btn">Сделать заказ</Link>
                            </>
                    }
                </div>
             </section>
         </CSSTransition>
     )
 })