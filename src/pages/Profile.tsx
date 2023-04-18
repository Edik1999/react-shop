import '../styles/pages/Profile.sass';
import '../styles/components/accordion.sass';

import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import useAnimationState from "../hooks/useAnimationState";
import { useEffect, useRef, useState } from "react";
import { collection, getDocs, query, where, orderBy, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "../store";
import { check } from "../helpers/check";
import { updateUserData } from "../store/slice/userSlice";

import Button from "../components/Button";
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { PatternFormat } from "react-number-format";
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';
import MapComponent from "../components/MapComponent";
import { YMaps, Map, Placemark, FullscreenControl, SearchControl, GeolocationControl, ZoomControl } from '@pbe/react-yandex-maps';

import emptycart from "../img/empty-cart.webp";

export const Profile = withAuthenticationRequired(({ db }: { db: any }) => {

    const { logout } = useAuth0();
    const animationState = useAnimationState();
    const nodeRef = useRef(null);
    const state = useAppSelector(state => state);
    const dispatch = useAppDispatch();

    const [orders, setOrders] = useState([]);
    // const [mapInstance, setMapInstance] = useState<any>();
    // const [placemark, setPlacemark] = useState<any>();
    const [userAddress, setUserAddress] = useState<string>('');
    const [isSended, setIsSended] = useState(false);
    // const [mapState, setMapState] = useState({
    //     center: [55.75, 37.57],
    //     zoom: 9
    // })

    async function checkOrders() {
        const q = query(collection(db, "orders"), where("user", "==", state.user[0].email), orderBy('date', 'desc'));
        return check(q)
    }

    useEffect(() => {
        checkOrders().then((res: any) => setOrders(res));
        // eslint-disable-next-line
    }, [state.user])

    useEffect(() => {
        if (state.user[0].address) {
            setUserAddress(state.user[0].address)
        }
    }, [state.user[0].address])

    // useEffect(() => {
    //     if (mapInstance && state.user[0].address) {
    //         mapInstance.geocode(state.user[0].address, { results: 1 }).then((res: { geoObjects: { get: (arg0: number) => { (): any; new(): any; geometry: { (): any; new(): any; getCoordinates: { (): any; new(): any; }; }; }; }; }) => {
    //             let coords = res.geoObjects.get(0).geometry.getCoordinates();
    //             setMapState({ center: coords, zoom: 16 })
    //         })
    //     }
    // }, [mapInstance, state.user[0].address])
    //
    // const mapClick = (e: any) => {
    //     let coords = e.get('coords');
    //     setMapState({ zoom: 17, center: coords })
    //     getAddress(coords)
    // }
    //
    // const getAddress = (coords: any) => {
    //     placemark.properties.set('iconCaption', 'поиск...');
    //
    //     mapInstance.geocode(coords).then(function (res: { geoObjects: { get: (arg0: number) => any; }; }) {
    //
    //         let geoObject = res.geoObjects.get(0);
    //
    //         setUserAddress(geoObject.getAddressLine())
    //
    //         placemark.properties.set({
    //             iconCaption: [
    //                 geoObject.getLocalities().length ? geoObject.getLocalities() : geoObject.getAdministrativeAreas(),
    //                 geoObject.getThoroughfare() || geoObject.getPremise()
    //             ].filter(Boolean).join(', '),
    //             balloonContent: geoObject.getAddressLine()
    //         });
    //     });
    // }

    async function sendForm(form: any) {
        const formData = new FormData(form)
        const name = formData.get('userName')
        const phone = formData.get('userPhone')
        const address = formData.get('userAddress')

        const userRef = doc(db, "users", state.user[0].email as string);

        await updateDoc(userRef, {
            name: name,
            phone: phone,
            address: address,
        });

        dispatch(updateUserData([{
            name: name,
            phone: phone,
            address: address,
        }]))

        console.log('form sended');
    }

    const formSubmitHandler = (e: { preventDefault: () => void; target: { closest: (arg0: string) => any; }; }) => {
        e.preventDefault();

        const form = e.target.closest('form');

        sendForm(form)
        setIsSended(true)
        setTimeout(() => {
            setIsSended(false)
        }, 5000)
    }

    const accordionClick = (id: any[]) => {
        const allItems = document.querySelectorAll(".accordion__item");
        for (const item of allItems) {
            item.classList.remove('open');
        }
        const openedPanel = document.getElementById(`accordion__heading-${id[0]}`);
        const accordionItem = openedPanel?.closest(".accordion__item");
        accordionItem?.classList.add('open');
    }

    const clearHistory = async () => {
        const q = query(collection(db, "orders"), where("user", "==", state.user[0].email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (order) => {
            await deleteDoc(doc(db, "orders", order.id));
            checkOrders().then((res: any) => setOrders(res));
        });
    }

    const setHeight = () => {
        const accordion = document.querySelector('.accordion')
        const panels = accordion?.querySelectorAll('.accordion__panel')
        if (panels) {
            panels.forEach((panel: any) => {
                const paragraphs = panel.querySelectorAll('p')
                let height: number = 0
                paragraphs.forEach((paragraph: any) => {
                    let paragraphHeight = getComputedStyle(paragraph).height
                    paragraphHeight = paragraphHeight.replace(/[^0-9]/g, '');
                    height += Number(paragraphHeight)
                })
                panel.style.height = `${height + 40}px`
            })
        }
    }

    return (
        <CSSTransition
            classNames="animation"
            in={animationState}
            timeout={700}
            mountOnEnter
            unmountOnExit
            nodeRef={nodeRef}
        >
            <>
                <section className='profile' ref={nodeRef}>
                    <div className='profile__history'>
                        <h2 className='section__title text-color'>История заказов</h2>
                        {orders.length > 0
                            ? <>
                                <Accordion allowZeroExpanded onChange={(id: any) => accordionClick(id)}>
                                    {orders.map((el: any) => (
                                        <AccordionItem key={Math.random()}>
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    <div className='accordion__wrap'>
                                                        <p className='section__text accordion-price'>Сумма заказа: <span className='text-color'>{el.sum} ₽</span></p>
                                                        <div className='accordion-date'>
                                                            <span className='section__text date__text'>Дата заказа: </span>
                                                            <Moment className='section__text date__descr' format="YYYY-MM-DD HH:mm">{new Date(el.date.seconds * 1000)}</Moment>
                                                        </div>
                                                    </div>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                {el.items.map((elem: any) => (
                                                    <p className='accordion-text' key={Math.random()} ref={(ref) => setHeight()}>
                                                        <span className='section__text'>{state.goods.map(element => element.id === elem.id ? element.title : null)}</span>
                                                        <span className='section__text'> x {elem.count}</span>
                                                    </p>
                                                ))}
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                                <Button modificator={"cart-btn"} text="Clear history" onClick={clearHistory}></Button>
                            </>

                            : <>
                                <img className="history__img" src={emptycart} alt="Cart is empty" />
                                <p className="section__text">Ваша история заказов пуста!</p>
                                <Link to="/menu" className="btn home-btn">Сделать заказ</Link>
                            </>
                        }
                    </div>
                    <div className='profile__user'>
                        <img className='user__photo' src={state.user[0].picture} alt={state.user[0].name} />
                        <h3 className='user__email'>{state.user[0].email}</h3>
                        <form className="profile__form">
                            <input type="text" defaultValue={state.user[0].name} name="userName" className="user__input" placeholder="Имя*" />
                            <PatternFormat value={state.user[0].phone} format="+7 (###) ### ## ##" mask="_" className="user__input" name="userPhone" placeholder="Телефон*" />
                            <textarea value={userAddress} name="userAddress" className="user__input user__input--textarea" placeholder="Адрес*" onChange={e => setUserAddress(e.target.value)} />
                            <MapComponent setUserAddress={setUserAddress}></MapComponent>
                            <Button modificator={"edit-btn home-btn"} disabled={isSended ? true : false} text="Save" onClick={(e) => formSubmitHandler(e)}></Button>
                            {isSended && <p className="success-text section__text">✅ your data was saved!</p>}
                            <Button modificator={"cart-btn profile-btn"} text={"Log Out"} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}></Button>
                        </form>
                    </div>
                </section>
            </>
        </CSSTransition>
    )
})