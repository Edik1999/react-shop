import '../styles/components/input.sass';

interface IProps {
    modifier: string,
    name: string,
    type: string,
    placeholder: string,
    defaultValue: string,
    onFocus?: (arg0: any) => void
}

function Input({ modifier, name, type, placeholder, defaultValue, onFocus }: IProps) {
    return (
        <input className={`input ${modifier}`} name={name} type={type} placeholder={placeholder} defaultValue={defaultValue} onFocus={onFocus}/>
    )
}

export default Input