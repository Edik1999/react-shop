import '../styles/pages/Profile.sass';

import { useAuth0, withAuthenticationRequired} from '@auth0/auth0-react';
import useAnimationState from "../hooks/useAnimationState";
import {useEffect, useRef, useState} from "react";
import {
    collection,
    getDocs,
    query,
    where,
    doc,
    updateDoc,
    deleteDoc,
    Firestore,
    DocumentData
} from "firebase/firestore";
import {useAppDispatch, useAppSelector} from "../store";
import {getDataFromDB} from "../helpers/getDataFromDB";
import {updateUserData} from "../store/slice/userSlice";
import {useTranslation} from "react-i18next";

import Button from "../components/Button";
import Input from "../components/Input";
import {CSSTransition} from 'react-transition-group';
import {Link} from 'react-router-dom';
import {PatternFormat} from "react-number-format";
import MapComponent from "../components/MapComponent";
import AccordionComponent from "../components/AccordionComponent";

import emptycart from "../img/empty-cart.webp";
import Loader from "../components/Loader";

export const Profile = withAuthenticationRequired(({db}: { db: Firestore }) => {

    const {logout} = useAuth0();
    const animationState = useAnimationState();
    const nodeRef = useRef(null);
    const state = useAppSelector(state => state);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const [orders, setOrders] = useState<DocumentData[]>([]);
    const [userAddress, setUserAddress] = useState('');
    const [isSent, setIsSent] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDataFromDB(db, state.user.email, true)
            .then((res: DocumentData[]) => {
                setOrders(res)
                setLoading(false)
            })

        const address = state.user.address

        if (address) {
            setUserAddress(address)
        }
    }, [db, state.user])

    async function sendForm(form: HTMLFormElement) {
        const formData = new FormData(form)
        const name = formData.get('userName')
        const phone = formData.get('userPhone')
        const address = formData.get('userAddress')

        const userRef = doc(db, "users", state.user.email as string);

        await updateDoc(userRef, {
            name: name,
            phone: phone,
            address: address,
        });

        dispatch(updateUserData({
            name: name,
            phone: phone,
            address: address,
        }))

        console.log('form sent');
    }

    const formSubmitHandler = (e: { preventDefault: () => void; target: { closest: (arg0: string) => HTMLFormElement }; }) => {
        e.preventDefault();

        const form = e.target.closest('form');

        sendForm(form).then(() => setIsSent(true))
        setTimeout(() => {
            setIsSent(false)
        }, 5000)
    }

    const clearHistory = async () => {
        const q = query(collection(db, "orders"), where("user", "==", state.user.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(order => {
            deleteDoc(doc(db, "orders", order.id));
        });
        setOrders([])
    }

    return (
        <>
            {loading && <Loader></Loader>}
            <CSSTransition
                classNames="animation"
                in={animationState}
                timeout={700}
                mountOnEnter
                unmountOnExit
                nodeRef={nodeRef}
            >
                <section className='profile flex' ref={nodeRef}>
                    <div className='profile__history history flex-y-center flex--column'>
                        <h2 className='history__title section__title text-color'>{t('historyTitle')}</h2>
                        {orders.length > 0
                            ? <>
                                <AccordionComponent items={orders}></AccordionComponent>
                                <Button modifier="cart-btn" text={t('clearHistoryBtn')} onClick={clearHistory}></Button>
                            </>

                            : <>
                                <img className="history__img" src={emptycart} alt={t('emptyHistoryImgAlt')} />
                                <p className="history__text section__text">{t('historyText')}</p>
                                <Link to="/menu" className="btn">{t('makeOrder')}</Link>
                            </>
                        }
                    </div>
                    <div className='profile__user user flex-y-center flex--column'>
                        <img className='user__photo' src={state.user.picture} alt={state.user.name} />
                        <h3 className='user__email'>{state.user.email}</h3>
                        <form className={`user__form form flex-y-center flex--column ${isSent && 'form--saved'}`}>
                            <Input name="userName" type="text" placeholder={t('inputNamePlaceholder')} defaultValue={state.user.name} modifier='form__input'/>
                            <PatternFormat value={state.user.phone} format="+7 (###) ### ## ##" mask="_" className="form__input input" name="userPhone" placeholder={t('inputPhonePlaceholder')} />
                            <textarea value={userAddress} name="userAddress" className="form__textarea input input--textarea" placeholder={t('inputAddressPlaceholder')} rows={3} onChange={e => setUserAddress(e.target.value)} />
                            <MapComponent setAddress={setUserAddress}></MapComponent>
                            <Button modifier="edit-btn" disabled={isSent ? true : false} text={t('profileFormSaveBtn')} onClick={e => formSubmitHandler(e)}></Button>
                            {isSent && <p className="form__text section__text">✅ {t('profileNotification')}</p>}
                            <Button modifier="cart-btn profile-btn" text={t('profileLogOut')} onClick={logout}></Button>
                        </form>
                    </div>
                </section>
            </CSSTransition>
        </>
    )
})