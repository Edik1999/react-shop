function Button({text, modificator, onClick, disabled}: {text: string, modificator?: string, onClick?: (arg0: any) => void, disabled?: boolean}) {
  return (
    <button className={`btn ${modificator} ${disabled && 'disabled'}`} disabled={disabled ? true : false} onClick={onClick}>{text}</button>
  )
}

export default Button