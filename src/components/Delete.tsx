import '../styles/components/delete.sass';

function Delete({parentClass, onClick}: { parentClass: string, onClick: (e: any) => void }) {
    return (
        <div className={'delete ' + parentClass} onClick={onClick}>
            <div className="delete__inner"></div>
        </div>
    )
}

export default Delete