import '../styles/components/button.sass';

interface IProps {
  text: string,
  modifier?: string,
  onClick?: (arg0?: any ) => void,
  disabled?: boolean
}

function Button({text, modifier, onClick, disabled}: IProps) {
  return (
    <button className={`btn ${modifier} ${disabled && 'disabled'}`} disabled={disabled ? true : false} onClick={onClick}>{text}</button>
  )
}

export default Button