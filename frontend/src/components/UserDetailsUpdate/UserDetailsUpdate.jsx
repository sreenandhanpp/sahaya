import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { URL } from '../../utils/url';
import Input from '../../components/Input/Input';
import { toast } from 'react-toastify';
import './UserDetailsUpdate.css';
import { getItem } from '../../../localStorage/getItem'
import AppCard from '../Card/Card';
import { USER } from '../../redux/constants/user';
import { setItem } from '../../../localStorage/setItem';


const UserDetailsUpdate = () => {
    const userData = getItem('user'); // Assuming this is how user data is stored in Redux
    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState({
        fullName: userData.fullname || '',
        email: userData.email || '',
    });
    const [errors, setErrors] = useState([]);

    const { loading } = useSelector(state => state.updateUserDetails);


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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm(); // Validate form input and store errors

        if (newErrors.length === 0) {
            try {
                dispatch({ type: USER.UPDATE_USER_DATA_REQUEST });
                // Make HTTP request to update user details
                const response = await axios.put(URL + `/user/api/update-user/${userData._id}`, {
                    fullName: formValues.fullName,
                    email: formValues.email,
                });

                setItem('user', response.data.userData)
                dispatch({ type: USER.UPDATE_USER_DATA_REQUEST, payload: response.data.userData });

                // Handle successful update
                toast.success("User details updated successfully", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            } catch (error) {
                // Handle error
                dispatch({ type: USER.UPDATE_USER_DATA_FAILED });

                console.log(error)
                toast.error(error.response.data.message, {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            }
        } else {
            setErrors(newErrors);
        }
    };

    const validateForm = () => {
        const newErrors = [];

        // Validate full name
        if (formValues.fullName.trim() === '') {
            newErrors.push({ field: 'fullName', message: 'Full name is required' });
        }

        // Validate email
        if (formValues.email.trim() === '') {
            newErrors.push({ field: 'email', message: 'Email is required' });
        } else {
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(formValues.email)) {
                newErrors.push({ field: 'email', message: 'Invalid email' });
            }
        }

        return newErrors;
    };

    return (
        <div className="container userDetailsUpdate">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <AppCard>

                        <div className="">
                            <h2 className=" text-start">Change profile details</h2>
                            <div className="py-md-4">
                                <form onSubmit={handleSubmit}>
                                    <Input
                                        type="text"
                                        placeholder="Full Name"
                                        name="fullName"
                                        value={formValues.fullName}
                                        HandleChange={HandleChange}
                                        errors={errors}
                                        className={'mb-3'}
                                    />
                                    <Input
                                        type="text"
                                        placeholder="Email"
                                        name="email"
                                        value={formValues.email}
                                        HandleChange={HandleChange}
                                        errors={errors}
                                        className={'mb-3'}

                                    />
                                    <button type="submit" className="btn  float-end">Update</button>
                                </form>
                            </div>
                        </div>
                    </AppCard>

                </div>
            </div>
        </div>
    );
};

export default UserDetailsUpdate;
