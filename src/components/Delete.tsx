import '../styles/components/delete.sass';

import {MouseEvent} from "react";

function Delete({parentClass, onClick}: { parentClass: string, onClick: (e: MouseEvent<HTMLDivElement>) => void }) {
    return (
        <div className={'delete ' + parentClass} onClick={onClick}>
            <div className="delete__inner"></div>
        </div>
    )
}

export default Delete