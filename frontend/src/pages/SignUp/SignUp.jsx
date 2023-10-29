import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { USER } from '../../redux/constants/user';
import Loading from '../../components/Loading';
import Input from '../../components/Input/Input';
import { toast } from 'react-toastify';
import './style.css'
import { URL } from '../../utils/url';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.userData);
  const [errors, setErrors] = useState([]);
  const [formValues, setFormValues] = useState({
    fullname: '',
    email: '',
    password: '',
  });

  const newErrors = [];
  const validateForm = () => {
    // Check if the fullname is empty
    if (formValues.fullname.trim() === '') {
      newErrors.push({ field: 'fullname', message: 'Full name is required' });
    }

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
    } else {
      const passwordPatternLengthEight = /^(?=.*\d).{8,}$/;
      const passwordPatternLengthTwelve = /^(?=.*\d).{8,12}$/;
      if (!passwordPatternLengthEight.test(formValues.password)) {
        newErrors.push({ field: 'password', message: 'Password must contain 8 characters' });
      } else if (!passwordPatternLengthTwelve.test(formValues.password)) {
        newErrors.push({ field: 'password', message: 'Password should not be more than 12 characters' });
      }
    }

    return newErrors;
  };

  // Handles form submission for user signup
  const SubmitHandler = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const newErrors = await validateForm(); // Validate form input and store errors

    if (newErrors.length === 0) {
      try {
        dispatch({ type: USER.SIGNUP_REQUEST }); // Dispatch an action to indicate a signup request

        // Make an HTTP POST request to the signup API
        axios
          .post(URL + '/user/api/signup', {
            email: formValues.email,
            fullname: formValues.fullname,
            password: formValues.password
          })
          .then((res) => {
            // Dispatch an action to indicate a successful signup
            dispatch({ type: USER.SIGNUP_SUCCESS, payload: res.data });
            navigate('/verify-email', { replace: true });
          })
          .catch((error) => {
            if (error.response) {
              // Handle errors with a response from the API
              if (error.response.data.message) {
                newErrors.push({ field: 'email', message: error.response.data.message });
                setErrors(newErrors); // Update the state with the new errors
              } else {
                // Display a toast notification for other errors
                toast.error(error.response.data.message, {
                  position: toast.POSITION.BOTTOM_CENTER
                });
              }
            } else {
              // Handle unexpected errors (e.g., network issues, server down)
              toast.error('An unexpected error occurred.', {
                position: toast.POSITION.BOTTOM_CENTER
              });
            }
            dispatch({ type: USER.SIGNUP_FAILED, errors: error }); // Dispatch an action for signup failure
          });
      } catch (err) {
        // Handle unexpected errors from the try block
        toast.error('An unexpected error occurred.', {
          position: toast.POSITION.BOTTOM_CENTER
        });
        dispatch({ type: USER.SIGNUP_FAILED, errors: "something went wrong" }); // Dispatch an action for signup failure
      }
    } else {
      // Only set errors in state when there are validation errors
      setErrors(newErrors);
    }
  };

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
    loading ?
      <Loading />
      :
      <div className='signup d-flex align-items-center'>
        <div className="container ">
          <div className="row justify-content-center">
            <div className="col-md-5">
              <div className="card">
                <h2 className="card-title text-center">Sign Up</h2>
                <div className="card-body py-md-4">
                  <form _lpchecked="1">
                    <Input
                      type={"text"}
                      placeholder={"Full name"}
                      id={"name"}
                      errors={errors}
                      label={'fullname'}
                      name={'fullname'}
                      HandleChange={HandleChange}
                      value={formValues.fullname}
                    />
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
                      <Link to={"/login"} >Already have an account</Link>
                      <button className="btn text-white" onClick={SubmitHandler}>Sign Up</button>
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

export default SignUp
