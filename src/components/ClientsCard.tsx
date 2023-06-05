import '../styles/components/clientsCard.sass';

import clientAvatar from "../img/client-avatar.webp";

function ClientsCard ({tag, handleImageChange, parentClass}: {tag: string, handleImageChange: () => void, parentClass: string}) {

    const content = () => (
        <>
            <p className="client-card__text section__text">Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit odio dignissim qui blandit molestie consequat.</p>
            <div className="client-card__info flex">
                <img className="client-card__avatar" src={clientAvatar} alt='client avatar' onLoad={handleImageChange} onError={handleImageChange}/>
                <div className="client-card__descr flex-x-around flex--column">
                    <p className="client-card__name text-color">John Armstrong</p>
                    <p className="client-card__role">Customer</p>
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