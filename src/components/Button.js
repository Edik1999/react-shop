function Button({text, modificator, onClick}) {
  return (
    <button className={`btn ${modificator}`} onClick={onClick}>{text}</button>
  )
}

export default Button