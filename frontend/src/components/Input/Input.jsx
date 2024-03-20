import React from 'react'
import Alert from '../Alert/Alert'
import './styles.css'

const   Input = ({ type,id,placeholder,label,errors,name,HandleChange,value}) => {
    return (
        <div className="form-group">
            <input
                type={type}
                className="form-control app_input"
                id={id}
                placeholder={placeholder}
                name={name}
                onChange={(e)=>HandleChange(e,name)}
                value={value}
            />
            <Alert errors={errors} label={name}/>
        </div>
    )
}

export default Input
