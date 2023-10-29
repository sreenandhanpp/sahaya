import React from 'react'
import './style.css'
const Campaigns = () => {
    return (
        <div className="col">
            <div className="campaign card">
                <img src="images/campaign1.jpg" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title"> Emily</h5>
                    <p className="card-text"> Emily is a 6-year-old girl who has been diagnosed with Childhood Leukemia. 
                    She's currently undergoing chemotherapy and needs financial support for her medical expenses.</p>
                </div>
                <div className="mb-5 d-flex justify-content-around">
                    <h3>25,000₹</h3>
                    <button className="btn text-white">Donate Now</button>
                </div>
            </div>
        </div>
    )
}

export default Campaigns
