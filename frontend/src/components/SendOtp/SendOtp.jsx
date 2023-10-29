import React from 'react'
import './style.css'


const SendOtp = ({ msg, HandleAction, color }) => {

    const msgStyle = {
        color: color
    }
    return (
        <div className='signup d-flex align-items-center'>
            <div className="container ">
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <div className="get-otp card">
                            <h2 className="card-title text-center">Generate OTP</h2>
                            <div className="card-body py-md-4">
                                <p className='text-center' style={msgStyle}>{msg}</p>
                                <form _lpchecked="1">
                                    <div className="d-flex flex-row align-items-center justify-content-between">
                                        <button className="get-otp-btn btn text-white" onClick={HandleAction}>GET OTP</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SendOtp