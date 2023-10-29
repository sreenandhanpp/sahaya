import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { USER } from '../redux/constants/user';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import ErrAlert from '../../components/ErrAlert';
import Loading from '../../components/Loading';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notMatchErr, setNotMatchErr] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [err, setErr] = useState([]);
  const { loading } = useSelector(state=>state.login);
  
  const SubmitHandler = (e) => {
    e.preventDefault();
    try {
      dispatch({ type: USER.LOGIN_REQUEST });
      axios.post('http://localhost:5000/api/login', {
        email,
        password
      }).then(res => {
        console.log(res);
        console.log(res.status);

        if (res.status == 200) {
          dispatch({ type: USER.LOGIN_SUCCESS, payload: res.data });
          console.log(res.data.isAdmin)
          if(res.data.isAdmin) {
            navigate('/admin-dashboard', { replace: true });
          }else{
            console.log('redirecting');
            navigate('/',{replace:true})
          }
        } else {
          dispatch({ type: USER.LOGIN_FAILED, payload: res.data });
        }
      }).catch(error=>{
        if(error){
          if(error.response.data.error){
            setNotMatchErr(error.response.data.error);
          }else{
            console.log(error.response.data.errors)
            setErr(error.response.data.errors);
          }
        }   
      })
    } catch (err) {
      dispatch({ type: USER.LOGIN_FAILED, payload: "something went wrong" });
    }
  }
  return (

  loading? <Loading />
  :
    <div className='edit-body'>
    <div className="container">
        <form id="form" className="form">
            <h2>LOGIN !</h2>
            <div className="form-control">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter email"
                    name='email'
                    // value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            <ErrAlert errors={err} label={'email'} />
              
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            <ErrAlert errors={err} label={'password'} />
            </div>
            <p className='err'> {notMatchErr} </p>
            <Link to={'/signup'}> <p className='radirect-user'>Create an account?</p> </Link>
            <button onClick={SubmitHandler} type="submit">Login</button>
        </form>
    </div>



</div>
  )
}

export default Login
