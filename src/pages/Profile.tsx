import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import Button from "../components/Button";
import { CSSTransition } from 'react-transition-group';
import useAnimationState from "../hooks/useAnimationState";
import React, {useEffect, useRef, useState} from "react";
import emptycart from "../img/empty-cart.webp";
import {Link} from 'react-router-dom';
import {collection, DocumentData, getDocs, query, where, orderBy, doc, updateDoc, Query, deleteDoc} from "firebase/firestore";
import {useAppSelector} from "../store";
import Moment from 'react-moment';
import {PatternFormat} from "react-number-format";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel
} from 'react-accessible-accordion';
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
    const [mapInstance, setMapInstance] = useState<any>();
    const [placemark, setPlacemark] = useState<any>();
    const [userAddress, setUserAddress] = useState<string>('');
    const [isSended, setIsSended] = useState(false);
    const [userInfo, setUserInfo] = useState<any>();
    const [mapState, setMapState] = useState({
        center: [55.75, 37.57],
        zoom: 9
    })

    const check = async (q: Query<unknown>) => {
        let appData: DocumentData[] = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            appData.push(doc.data() as DocumentData);
        });

        return appData
    }

    async function checkOrders() {
        const q = query(collection(db, "orders"), where("user", "==", user?.email), orderBy('date', 'desc'));
        return check(q)
    }

    async function checkUser() {
        const q = query(collection(db, "users"), where("email", "==", user?.email));
        return check(q)
    }

    useEffect(() => {
        checkOrders().then((res: any) => setOrders(res));
        checkUser().then((res: any) => setUserInfo(res));
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(userInfo) {
            setUserAddress(userInfo[0].address)
        }
    }, [userInfo])

    useEffect(() => {
        if(mapInstance) {
            mapInstance.geocode(userInfo[0].address, {results: 1}).then((res: { geoObjects: { get: (arg0: number) => { (): any; new(): any; geometry: { (): any; new(): any; getCoordinates: { (): any; new(): any; }; }; }; }; }) => {
                let coords = res.geoObjects.get(0).geometry.getCoordinates();
                setMapState({center: coords, zoom: 16})
            })
        }
    }, [mapInstance, userInfo])

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

        const userRef = doc(db, "users", user?.email as string);

        await updateDoc(userRef, {
                name: name,
                phone: phone,
                address: address,
        });

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
        for (const item of allItems){
            item.classList.remove('open');
        }
        const openedPanel = document.getElementById(`accordion__heading-${id[0]}`);
        const accordionItem = openedPanel?.closest(".accordion__item");
        accordionItem?.classList.add('open');
    }

    const clearHistory = async () => {
        const q = query(collection(db, "orders"), where("user", "==", user?.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (order) => {
            await deleteDoc(doc(db, "orders", order.id));
            checkOrders().then((res: any) => setOrders(res));
        });
    }

    const setHeight = () => {
        const accordion = document.querySelector('.accordion')
        const panels = accordion?.querySelectorAll('.accordion__panel')
        if(panels){
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
                    <div className='profile__user'>
                        <img className='user__photo' src={user?.picture} alt={user?.name}/>
                        <h3 className='user__email'>{user?.email}</h3>
                        <form className="profile__form">
                            <div className="form-wrap">
                                <input type="text" defaultValue={userInfo ? userInfo[0].name : ''} name="userName" className="user__input" placeholder="Имя"/>
                                <PatternFormat value={userInfo ? userInfo[0].phone : ''} format="+7 (###) ### ## ##" mask="_" className="user__input" name="userPhone" placeholder="Телефон"/>
                            </div>
                            <textarea value={userAddress} name="userAddress" className="user__input user__input--textarea" placeholder="Адрес" onChange={e => setUserAddress(e.target.value)}/>
                            <YMaps query={{ apikey: '5f4951d5-9bcf-4ea4-ae8b-b561e80e3ca1', load: "package.full",}}>
                                <Map
                                    state={{ center: mapState.center, zoom: mapState.zoom, controls: []}}
                                    className="map"
                                    onLoad={ymaps => setMapInstance(ymaps)}
                                    onClick={(e: any) => mapClick(e)}
                                >
                                    <Placemark geometry={mapState.center} instanceRef={(instance) => setPlacemark(instance)}/>
                                    <FullscreenControl />
                                    <SearchControl options={{ float: "right" }} />
                                    <GeolocationControl options={{ float: "left" }} />
                                    <ZoomControl />
                                </Map>
                            </YMaps>
                            <Button modificator={"edit-btn"} disabled={isSended ? true : false} text="Save" onClick={(e) => formSubmitHandler(e)}></Button>
                            {isSended && <p className="success-text">✅ your data was saved!</p>}
                        </form>
                    </div>
                    <div className='profile__history'>
                        <h2 className='section__title text-color'>История заказов</h2>
                        {orders.length > 0
                            ?   <>
                            <Accordion allowZeroExpanded onChange={(id: any) => accordionClick(id)}>
                                    {orders.map((el: any) => (
                                        <AccordionItem key={Math.random()}>
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    <div className='accordion__wrap'>
                                                        <p className='section__text accordion-price'>Сумма заказа: <span className='text-color'>{el.sum} ₽</span></p>
                                                        <div className='accordion-date'>
                                                            <span className='section__text'>Дата заказа: </span>
                                                            <Moment className='section__text' format="YYYY-MM-DD HH:mm">{new Date(el.date.seconds * 1000)}</Moment>
                                                        </div>
                                                    </div>
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                                                {el.items.map((elem: any) => (
                                                    <p key={Math.random()} ref={(ref) => setHeight()}>
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