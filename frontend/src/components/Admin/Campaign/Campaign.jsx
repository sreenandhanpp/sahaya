import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ADMIN } from '../../../redux/constants/admin'
import { URL } from '../../../utils/url'

const Campaign = ({ value, onDelete }) => {
    return (
        <div key={value._id} className="col-md-3">
            <div className="campaign card">
                <img src={`${URL}/${value.img}`} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title"> {value.fullname} </h5>
                    <p className="card-text"> <strong>{value.disease} </strong>  <br/> {value.about.slice(0,30 ) + '...'} Donation Amount : <strong>{value.amount}</strong></p>
                    
                </div>
                <div className=" d-flex justify-content-around align-items-center">
                    <Link to={`/update-campaign/${value._id}`} >
                        <button className="btn">Edit</button>
                    </Link>
                    <button className="btn-delete btn" onClick={() => onDelete(value)}><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        </div>
    )
}

export default Campaign
