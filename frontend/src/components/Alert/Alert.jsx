import React from 'react'
import './style.css'

const Alert = ({ errors, label }) => {
  return (
    errors &&
    errors.map(value => {
      if (value.field == label) {
        return <p key={value.field} className='alert'> *{value.message} </p>
      }
    })
  )
}

export default Alert