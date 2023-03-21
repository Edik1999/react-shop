function Button({text, modificator, onClick}: {text: string, modificator: string, onClick?: (arg0: any) => void}) {
  return (
    <button className={`btn ${modificator}`} onClick={onClick}>{text}</button>
  )
}

export default Button