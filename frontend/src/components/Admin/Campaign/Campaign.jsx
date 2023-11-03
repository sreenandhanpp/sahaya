import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ADMIN } from '../../../redux/constants/admin'

const Campaign = ({ value, onDelete }) => {
    return (
        <div key={value._id} className="col-md-3">
            <div className="campaign card">
                <img src="images/campaign1.jpg" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title"> {value.fullname} </h5>
                    <p className="card-text"> {value.disease}</p>
                </div>
                <div className="mb-5 d-flex justify-content-around align-items-center">
                    <h3 className=''> {value.amount} </h3>
                    <Link to={`/update-campaign/${value._id}`} >
                        <button className="edit-btn btn text-white">Edit</button>
                    </Link>
                    <button className="delete-btn btn text-white" onClick={() => onDelete(value)}><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        </div>
    )
}

export default Campaign
