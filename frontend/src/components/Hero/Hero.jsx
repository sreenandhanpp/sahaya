import React from 'react'
import './style.css'
const Hero = () => {
    return (
        <div className="hero position-relative w-100">
            <div className="hero-position-wrapper position-absolute text-white d-flex flex-column align-items-center justify-content-center">
                <h1 className="display-1 mb-4 mt-2 font-weight-bold text-center">SAHAYA</h1>
                <span className='qoute text-center'>we <u>#ensure</u> the support who truly deserves</span>
            </div>
        </div>
    )
}

export default Hero
