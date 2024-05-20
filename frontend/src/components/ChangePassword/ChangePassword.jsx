import React, { useState } from 'react';
import axios from 'axios';
import Input from '../../components/Input/Input';
import { URL } from '../../utils/url';
import { toast } from 'react-toastify';
import './ChangePassword.css'; // Add CSS file for styling
import AppCard from '../Card/Card';
import { Link } from 'react-router-dom';

const ChangePassword = () => {
    const [formValues, setFormValues] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState([]);

    // Handles changes in form input fields, updating form values and removing associated validation errors.
    const handleChange = (e, fieldName) => {
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
                // Make HTTP request to change password
                const response = await axios.post(URL + '/user/api/change-password', {
                    currentPassword: formValues.currentPassword,
                    newPassword: formValues.newPassword,
                });
                // Handle successful password change
                toast.success(response.data.message, {
                    position: toast.POSITION.BOTTOM_CENTER
                });
                // Clear form fields after successful password change
                setFormValues({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                });
            } catch (error) {
                // Handle error
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

        // Validate current password
        if (formValues.currentPassword.trim() === '') {
            newErrors.push({ field: 'currentPassword', message: 'Current password is required' });
        }

        // Validate new password
        if (formValues.newPassword.trim() === '') {
            newErrors.push({ field: 'newPassword', message: 'New password is required' });
        }

        // Validate password confirmation
        if (formValues.newPassword !== formValues.confirmPassword) {
            newErrors.push({ field: 'confirmPassword', message: 'Passwords do not match' });
        }

        return newErrors;
    };

    return (
        <div className="container changePassword">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <AppCard>
                        <div className="">
                            <h2 className="text-start mb-4">Change Password</h2>
                            <form onSubmit={handleSubmit}>
                                <Input
                                    type="password"
                                    placeholder="Current Password"
                                    name="currentPassword"
                                    value={formValues.currentPassword}
                                    HandleChange={handleChange}
                                    errors={errors}
                                    className={'mb-2'}
                                />
                                <Input
                                    type="password"
                                    placeholder="New Password"
                                    name="newPassword"
                                    value={formValues.newPassword}
                                    HandleChange={handleChange}
                                    errors={errors}
                                    className={'mb-2'}

                                />
                                <Input
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    value={formValues.confirmPassword}
                                    HandleChange={handleChange}
                                    errors={errors}
                                    className={'mb-2'}

                                />
                                <div className='d-flex align-items-center justify-content-between'>
                                    <Link className='mt-4 forgot-link'>Forgot password?</Link>
                                    <button type="submit" className="btn mt-4 ">Change Password</button>
                                </div>
                            </form>
                        </div>
                    </AppCard>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
