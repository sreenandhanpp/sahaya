import React from 'react'

const ErrAlert = ({errors,label}) => {
  return (
    (
        errors?
        errors.map(value=>{
            if(value.path == label){
                return <div key={value.msg}><p className='err'> *{value.msg} </p></div>
            }
        })
        : null
    )
  )
}

export default ErrAlert
