import '../styles/components/clientsCard.sass';

import clientAvatar from "../img/client-avatar.webp";
import {useTranslation} from "react-i18next";

function ClientsCard ({tag, handleImageChange, parentClass}: {tag: string, handleImageChange: () => void, parentClass: string}) {

    const { t } = useTranslation()

    const content = () => (
        <>
            <p className="client-card__text section__text">{t('clientText')}</p>
            <div className="client-card__info flex">
                <img className="client-card__avatar" src={clientAvatar} alt={t('clientAlt')} onLoad={handleImageChange} onError={handleImageChange}/>
                <div className="client-card__descr flex-x-around flex--column">
                    <p className="client-card__name text-color">John Armstrong</p>
                    <p className="client-card__role">{t('clientRole')}</p>
                </div>
            </div>
        </>
    )

    if (tag === 'div'){
        return (
            <div className={parentClass + ' client-card'}>
                {content()}
            </div>
        )
    } else{
        return (
            <li className={parentClass + ' client-card'}>
                {content()}
            </li>
        )
    }
}

export default ClientsCard