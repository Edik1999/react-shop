import React from 'react'
// import Button from 

function Button({text, modificator}) {
  return (
    <>
    <button className={`btn ${modificator}`}>{text}</button>
    </>
  )
}

export default Button