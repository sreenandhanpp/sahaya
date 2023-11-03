import React from 'react'
import Alert from '../Alert/Alert'

const   Input = ({ type,id,placeholder,label,errors,name,HandleChange,value}) => {
    return (
        <div className="form-group">
            <input
                type={type}
                className="form-control"
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
