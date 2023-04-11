import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Button from "../components/Button";
import { CSSTransition } from 'react-transition-group';
import useAnimationState from "../hooks/useAnimationState";
import React, {useEffect, useRef, useState} from "react";
import emptycart from "../img/empty-cart.webp";
import {Link} from 'react-router-dom';
import {collection, DocumentData, getDocs, query, where, orderBy, addDoc} from "firebase/firestore";
import {useAppSelector} from "../store";
import Moment from 'react-moment';
import {PatternFormat} from "react-number-format";
import {Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel} from 'react-accessible-accordion';
import {
    YMaps,
    Map,
    Placemark,
    FullscreenControl,
    SearchControl,
    GeolocationControl,
    ZoomControl
} from '@pbe/react-yandex-maps';

export const Profile = withAuthenticationRequired(({db}: { db: any }) => {

    const {logout, user} = useAuth0();
    const animationState = useAnimationState();
    const nodeRef = useRef(null);
    const state = useAppSelector(state => state);

    const [orders, setOrders] = useState([]);
    const [mapState, setMapState] = useState({
        center: [55.75, 37.57],
        zoom: 9
    })
    const [mapInstance, setMapInstance] = useState<any>();
    const [placemark, setPlacemark] = useState<any>();
    const [userAddress, setUserAddress] = useState<string>('');
    const [error, setError] = useState(false);
    const [isSended, setIsSended] = useState(false);

    async function checkOrders() {
        const q = query(collection(db, "orders"), where("user", "==", user?.email), orderBy('date', 'desc'));

        let appData: DocumentData[] = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            appData.push(doc.data());
        });

        return appData
    }

    useEffect(() => {
        checkOrders().then((res: any) => setOrders(res));
        // eslint-disable-next-line
    }, [])

    const init = (ymaps: any) => {
        setMapInstance(ymaps)
    }

    const mapClick = (e: any) => {
        let coords = e.get('coords');
        setMapState({zoom: 17, center: coords})
        getAddress(coords)
    }

    const getAddress = (coords: any) => {
        placemark.properties.set('iconCaption', 'поиск...');

        mapInstance.geocode(coords).then(function (res: { geoObjects: { get: (arg0: number) => any; }; }) {

            let geoObject = res.geoObjects.get(0);

            setUserAddress(geoObject.getAddressLine())

            placemark.properties.set({
                iconCaption: [
                    geoObject.getLocalities().length ? geoObject.getLocalities() : geoObject.getAdministrativeAreas(),
                    geoObject.getThoroughfare() || geoObject.getPremise()
                ].filter(Boolean).join(', '),
                balloonContent: geoObject.getAddressLine()
            });
        });
    }

    async function sendForm(form: any){
        const formData = new FormData(form)
        const name = formData.get('userName')
        const phone = formData.get('userPhone')
        const address = formData.get('userAddress')

        // await addDoc(collection(db, "feedback"), {
        //     name: name,
        //     phone: phone,
        //     address: address,
        // });

        console.log('form sended');
    }

    const formSubmitHandler = (e: { preventDefault: () => void; target: { closest: (arg0: string) => any; }; }) => {
        e.preventDefault();
        setError(false);
        const form = e.target.closest('form');
        const inputs = form.querySelectorAll('.user__input');
        let allGood = true

        for (const input of inputs) {
            if (input.value === '') {
                allGood = false
                setError(true);
                input.classList.add('error');
            }
        }

        if(allGood) {
            sendForm(form)
            setIsSended(true)
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
                    <div className='profile__user'>
                        <img className='user__photo' src={user?.picture} alt={user?.name}/>
                        <h3 className='user__email'>{user?.email}</h3>
                        <form className="profile__form">
                            <input type="text" defaultValue={user?.name !== user?.email ? user?.name : ''} name="userName" className="user__input" placeholder="Имя"/>
                            <PatternFormat format="+7 (###) ### ## ##" mask="_" className="user__input" name="userPhone" placeholder="Телефон"/>
                            <textarea value={userAddress} name="userAddress" className="user__input user__input--textarea" placeholder="Адрес" onChange={e => setUserAddress(e.target.value)}/>
                            <YMaps query={{ apikey: '5f4951d5-9bcf-4ea4-ae8b-b561e80e3ca1', load: "package.full",}}>
                                <Map
                                    state={{ center: mapState.center, zoom: mapState.zoom, controls: []}}
                                    className="map"
                                    onLoad={ymaps => init(ymaps)}
                                    onClick={(e: any) => mapClick(e)}
                                >
                                    <Placemark geometry={mapState.center} instanceRef={(instance) => setPlacemark(instance)}/>
                                    <FullscreenControl />
                                    <SearchControl options={{ float: "right" }} />
                                    <GeolocationControl options={{ float: "left" }} />
                                    <ZoomControl />
                                </Map>
                            </YMaps>
                            <Button modificator={"edit-btn"} text="save" onClick={(e) => formSubmitHandler(e)}></Button>
                        </form>
                    </div>
                    <div className='profile__history'>
                        <h2 className='section__title text-color'>История заказов</h2>
                        {orders.length > 0
                            ?   <Accordion allowZeroExpanded>
                                    {orders.map((el: any) => (
                                        <AccordionItem key={Math.random()}>
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    <span>Дата заказа: </span>
                                                    <Moment format="YYYY-MM-DD HH:mm">{new Date(el.date.seconds * 1000)}</Moment>
                                                    <p>Сумма заказа: {el.sum} ₽</p>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                {el.items.map((elem: any) => (
                                                    <p key={Math.random()}>
                                                        <span>{state.goods.map(element => element.id === elem.id ? element.title : null)}</span>
                                                        <span> x {elem.count}</span>
                                                    </p>
                                                ))}
                                            </AccordionItemPanel>
                                        </AccordionItem>
                                    ))}
                                </Accordion>

                            :   <>
                                    <img className="history__img" src={emptycart} alt="Cart is empty"/>
                                    <p className="section__text">Ваша история заказов пуста!</p>
                                    <Link to="/menu" className="btn home-btn">Сделать заказ</Link>
                                </>
                        }
                    </div>
                </section>
                <Button modificator={"cart-btn"} text={"Log Out"} onClick={() => logout({logoutParams: {returnTo: window.location.origin}})}></Button>
             </>
         </CSSTransition>
     )
 })