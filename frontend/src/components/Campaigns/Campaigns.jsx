import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import { URL } from '../../utils/url'
const Campaigns = ({ key, campaign }) => {
    return (
    <Link to={`/campaign-details/${campaign._id}`}>
        <div key={key} className="col">
            <div className="campaign card">
                <img src={`${URL}/${campaign.img}`} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{campaign.fullname} </h5>
                    <p className="card-text">{campaign.desease}</p>
                    <p className="card-text">{campaign.about}</p>
                </div>
                <div className="mb-5 d-flex justify-content-around">
                    <h3> {campaign.amount} </h3>
                    <button >Donate Now</button>
                </div>
            </div>
        </div>
    </Link>
    )
}

export default Campaigns
