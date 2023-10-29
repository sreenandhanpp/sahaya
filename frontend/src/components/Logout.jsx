import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { USER } from '../src/redux/constants/user';
import axios from 'axios';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const LogoutHandler =  () => {

        try {
            dispatch({ type: USER.LOGOUT_REQUEST });
             axios.get('http://localhost:5000/api/logout').then((res)=>{
                if (res.status == 200) {
                    dispatch({ type: USER.LOGOUT_SUCCESS, payload: res.message });
                    navigate('/login', { replace: true });
                } else {
                    dispatch({ type: USER.LOGOUT_SUCCESS, payload: res.message });
                }
             })
           
        } catch (err) {
            dispatch({ type: USER.LOGOUT_SUCCESS, payload: "something went wrong" });
        }
    }
    return (

        <Link className="cta">
            <button onClick={LogoutHandler}>Logout</button>
        </Link>
    )
}

export default Logout
