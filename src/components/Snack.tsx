import '../styles/components/snack.sass';
import logo from '../img/logo.svg';
import {useTranslation} from "react-i18next";
import Button from "./Button";
import Delete from "./Delete";

function Snack({closeFunc}: {closeFunc: () => void}) {
    const { t} = useTranslation()

    return (
    <div className='snack flex-x-between-y-center'>
        <img className="snack__img snack-img" src={logo} alt={t('logoAlt')}/>
        <div className="snack__content snack-content flex-x-around-y-center">
            <p className="snack-content__text snack-content-text">
                {t('snackText')}
            </p>
            <Button modifier={'snack-content__btn snack-content-btn'} text={t('snackBtnText')}></Button>
        </div>
        <Delete parentClass="snack__close snack-close" onClick={closeFunc}/>
    </div>
    )
}

export default Snack