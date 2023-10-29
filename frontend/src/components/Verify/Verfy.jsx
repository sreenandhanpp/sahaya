import React from 'react'
import './style.css'

const Verfy = ({ color, msg, HandleChange, HandleResend, HandleVerify }) => {

    const msgStyle = {
        color: color
    }

    return (
        <div className='signup d-flex align-items-center'>
            <div className="container ">
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <div className="get-otp card">
                            <h2 className="card-title text-center">Verify OTP</h2>
                            <div className="card-body py-md-4">
                                    <p className='text-center' style={msgStyle}>{msg}</p>
                                <form _lpchecked="1">
                                    <div className="otp-inputs d-flex flex-row justify-content-center m-2">
                                        <input className="m-2 text-center form-control rounded" type="text" id="first" maxLength="1" onChange={HandleChange} name='digitOne' />
                                        <input className="m-2 text-center form-control rounded" type="text" id="second" maxLength="1" onChange={HandleChange} name='digitTwo' />
                                        <input className="m-2 text-center form-control rounded" type="text" id="third" maxLength="1" onChange={HandleChange} name='digitThree' />
                                        <input className="m-2 text-center form-control rounded" type="text" id="fourth" maxLength="1" onChange={HandleChange} name='digitFour' />
                                    </div>
                                    <div className="d-flex flex-row align-items-center justify-content-between">
                                        <button className="get-otp-btn btn text-white m-1" onClick={HandleResend}>RESEND</button>
                                        <button className="get-otp-btn varify-otp-btn btn text-white m-1" onClick={HandleVerify}>VERIFY</button>
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

export default Verfy