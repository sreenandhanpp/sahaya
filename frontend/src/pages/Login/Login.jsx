import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { USER } from '../../redux/constants/user';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Loading from '../../components/Loader/Loader';
import { URL } from '../../utils/url';
import Input from '../../components/Input/Input';
import { toast } from 'react-toastify';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const { loading } = useSelector(state => state.login);
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    });

    const newErrors = [];
    const validateForm = () => {
        // Check if the email is empty and follows a valid pattern
        if (formValues.email.trim() === '') {
            newErrors.push({ field: 'email', message: 'Email is required' });
        } else {
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(formValues.email)) {
                newErrors.push({ field: 'email', message: 'Invalid email' });
            }
        }

        // Check if the password is empty and follows valid patterns
        if (formValues.password.trim() === '') {
            newErrors.push({ field: 'password', message: 'Password is required' });
        }

        return newErrors;
    };
    const SubmitHandler = async (e) => {
        e.preventDefault();
        const newErrors = await validateForm(); // Validate form input and store errors

        if (newErrors.length === 0) {
            try {
                dispatch({ type: USER.LOGIN_REQUEST });
                axios.post(URL + '/user/api/login', {
                    email: formValues.email,
                    password: formValues.password
                }).then(res => {
                    dispatch({ type: USER.LOGIN_SUCCESS, payload: res.data });
                    if (res.data.admin) {
                        navigate('/dashboard', { replace: true });
                    } else {
                        console.log('redirecting');
                        navigate('/', { replace: true })
                    }
                }).catch(error => {
                    if (error) {
                        dispatch({ type: USER.LOGIN_FAILED, payload: error.response.data.message });
                        if (error.response.data.message) {
                            newErrors.push({ field: 'password', message: error.response.data.message });
                            setErrors(newErrors); // Update the state with the new errors
                        }
                    }
                })
            } catch (err) {
                dispatch({ type: USER.LOGIN_FAILED, payload: "something went wrong" });
                toast.error("something went wrong", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            }
        } else {
            setErrors(newErrors)
        }
    }

    // Handles changes in form input fields, updating form values and removing associated validation errors.
    const HandleChange = (e, fieldName) => {
        // Update the form field state using the spread operator to maintain previous values
        setFormValues((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });

        // Filter out any previous validation errors related to the changed field
        const updatedErrors = errors.filter((error) => error.field !== fieldName);

        // Set the updated errors state, removing errors associated with the changed field
        setErrors(updatedErrors);
    }
    return (

        loading ? <Loading />
            :
            <div className='signup d-flex align-items-center'>
                <div className="container ">
                    <div className="row justify-content-center">
                        <div className="col-md-5">
                            <div className="card">
                                <h2 className="card-title text-center">Sign In</h2>
                                <div className="card-body py-md-4">
                                    <form _lpchecked="1">
                                        <Input
                                            type={"text"}
                                            placeholder={"Email"}
                                            id={"text"}
                                            errors={errors}
                                            label={'email'}
                                            name={'email'}
                                            HandleChange={HandleChange}
                                            value={formValues.email}
                                        />
                                        <Input
                                            type={"password"}
                                            placeholder={"Password"}
                                            id={"password"}
                                            errors={errors}
                                            label={'password'}
                                            name={'password'}
                                            HandleChange={HandleChange}
                                            value={formValues.password}
                                        />
                                        <div className="d-flex flex-row align-items-center justify-content-between">
                                            <Link to={"/signup"} >Create an account</Link>
                                            <button className="btn text-white" onClick={SubmitHandler}>Sign In</button>
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

export default Login
