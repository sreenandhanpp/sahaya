import React, { useState } from 'react'
import Input from '../../../components/Input/Input'
import './style.css'
import { Link, useNavigate } from 'react-router-dom'
import Alert from '../../../components/Alert/Alert'
import { URL } from '../../../utils/url'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { ADMIN } from '../../../redux/constants/admin'
import Loader from '../../../components/Loader/Loader'

const CreateCampaign = () => {
    const [errors, setErrors] = useState([]);
    const [img, setImg] = useState(null);
    const [formValues, setFormValues] = useState({
        fullname: '',
        disease: '',
        amount: '',
        address: '',
        ifsc: '',
        confirm_ifsc: '',
        account_no: '',
        confirm_account_no: '',
        date: '',
        about: ''
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector(state => state.createCampaign);
    const newErrors = [];
    /**
    * Validates form input fields and collects error messages for each invalid field.
    * Returns an array of error objects. 
    **/
    const validateForm = () => {

        // Check if the fullname is empty
        if (formValues.fullname.trim() === '') {
            newErrors.push({ field: 'fullname', message: 'Full name is required' });
        }

        // Check if the address is empty
        if (formValues.address.trim() === '') {
            newErrors.push({ field: 'address', message: 'Address is required' });
        }

        // Check if the disease is empty
        if (formValues.disease.trim() === '') {
            newErrors.push({ field: 'disease', message: 'Disease is required' });
        }

        // Check if the amount is empty and is a positive number
        if (formValues.amount.trim() === '') {
            newErrors.push({ field: 'amount', message: 'Amount is required' });
        } else {
            const amountPattern = /^[1-9]\d*(\.\d+)?$/;
            if (!amountPattern.test(formValues.amount)) {
                newErrors.push({ field: 'amount', message: 'Invalid amount' });
            }
        }
        if (formValues.account_no.trim() === '') {
            newErrors.push({ field: 'account_no', message: 'Account number is required' });
        } else if (!/^\d{9,18}$/.test(formValues.account_no)) {
            newErrors.push({ field: 'account_no', message: 'Invalid account number' });
        } else if (formValues.account_no !== formValues.confirm_account_no) {
            newErrors.push({ field: 'confirm_account_no', message: 'Account numbers do not match' });
        }

        // Check if an image is selected (you may need to define specific criteria for image validation)
        if (!img) {
            newErrors.push({ field: 'image', message: 'Image is required' });
        }

        if (formValues.ifsc.trim() === '') {
            newErrors.push({ field: 'ifsc', message: 'IFSC code is required' });
        } else if (!/^[^\s]{4}\d{7}$/.test(formValues.ifsc)) {
            newErrors.push({ field: 'ifsc', message: 'Invalid IFSC code' });
        } else if (formValues.ifsc !== formValues.confirm_ifsc) {
            newErrors.push({ field: 'confirm_ifsc', message: 'IFSC codes do not match' });
        }

        // Check if the date is empty
        if (formValues.date.trim() === '') {
            newErrors.push({ field: 'date', message: 'Date is required' });
        }

        return newErrors;
    };

    const HandleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        const newErrors = await validateForm(); // Validate form input and store errors

        if (newErrors.length === 0) {
            const formData = new FormData();
            formData.append('img', img);
            formData.append('fullname', formValues.fullname);
            formData.append('disease', formValues.disease);
            formData.append('address', formValues.address);
            formData.append('date', formValues.date);
            formData.append('account_no', formValues.account_no);
            formData.append('ifsc', formValues.ifsc);
            formData.append('amount', formValues.amount);
            formData.append('about', formValues.about);


            try {
                // Dispatch an action to indicate the start of the campaign creation process
                dispatch({ type: ADMIN.CREATE_CAMPAIGN_REQUEST });

                // Make an HTTP POST request to create a new campaign
                axios.post(URL + '/admin/api/create-campaign', formData)
                    .then(res => {
                        console.log(res);
                        if (res.status === 200) {
                            // If the creation is successful, dispatch a success action
                            dispatch({ type: ADMIN.CREATE_CAMPAIGN_SUCCESS });

                            // Redirect to '/dashboard' route
                            navigate('/dashboard', { replace: true });

                            // Display a success message using a toast notification
                            toast.success(res.data.message, {
                                position: toast.POSITION.BOTTOM_CENTER
                            });
                        }
                    })
                    .catch(err => {
                        if (err) {
                            if (err.response.status === 401) {
                                // Handle validation errors from the server
                                let valueExistError = err.response.data.errors;
                                valueExistError.map(error => {
                                    newErrors.push({ field: error.path, message: error.msg });
                                });
                                setErrors(newErrors);
                            } else {
                                // Display an error message using a toast notification
                                toast.error(err.response.data.message, {
                                    position: toast.POSITION.BOTTOM_CENTER
                                });
                            }
                        }

                        // Dispatch a failure action with the error payload
                        dispatch({ type: ADMIN.CREATE_CAMPAIGN_FAILED, payload: err });
                    });
            } catch (err) {
                // Display a generic error message
                toast.error("Something went wrong while creating the campaign", {
                    position: toast.POSITION.BOTTOM_CENTER
                });

                // Dispatch a failure action if an error occurs during the creation process
                dispatch({ type: ADMIN.CREATE_CAMPAIGN_FAILED, payload: err });
            }
        } else {
            // Set validation errors if there are any
            setErrors(newErrors);
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

    // Define a function to handle the selection of image files
    const handleFile = (e, fieldName) => {
        setImg(e.target.files[0]);
        const updatedErrors = errors.filter((error) => error.field !== fieldName);
        setErrors(updatedErrors);
    }

    return (
        loading ?
            <Loader />
            :
            <div className="create-campaign">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-md-8">
                            <div className="card">
                                <h2 className="card-title text-center">Create Campaign</h2>
                                <div className="card-body py-md-4">
                                    <form _lpchecked="1">
                                        <Input
                                            type={"text"}
                                            id={"fullname"}
                                            placeholder={"Full Name"}
                                            name={'fullname'}
                                            HandleChange={HandleChange}
                                            errors={errors}
                                        />
                                        <div className="row">
                                            <div className="col-md-6">
                                                <Input
                                                    type={"text"}
                                                    id={"account_no"}
                                                    placeholder={"Account Number"}
                                                    name={"account_no"}
                                                    HandleChange={HandleChange}
                                                    errors={errors}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <Input
                                                    type={"text"}
                                                    id={"confirm_account_no"}
                                                    placeholder={"Confirm Account Number"}
                                                    name={"confirm_account_no"}
                                                    HandleChange={HandleChange}
                                                    errors={errors}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <Input
                                                    type={"text"}
                                                    id={"ifsc"}
                                                    placeholder={"IFSC Code"}
                                                    name={"ifsc"}
                                                    HandleChange={HandleChange}
                                                    errors={errors}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <Input
                                                    type={"text"}
                                                    id={"confirm_ifsc"}
                                                    placeholder={"Confirm IFSC Code"}
                                                    name={"confirm_ifsc"}
                                                    HandleChange={HandleChange}
                                                    errors={errors}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <textarea
                                                className="form-control"
                                                id="disease"
                                                placeholder="Disease Description"
                                                name='disease'
                                                onChange={(e) => HandleChange(e, 'disease')}
                                            />
                                            <Alert errors={errors} label={'disease'} />
                                        </div>
                                        <div className="form-group">
                                            <textarea
                                                className="form-control"
                                                id="about"
                                                placeholder="about"
                                                name="about"
                                                onChange={(e) => HandleChange(e, 'about')}
                                            />
                                            <Alert errors={errors} label={'address'} />
                                        </div>
                                        <div className="form-group">
                                            <textarea
                                                className="form-control"
                                                id="address"
                                                placeholder="Address"
                                                name="address"
                                                onChange={(e) => HandleChange(e, 'address')}
                                            />
                                            <Alert errors={errors} label={'address'} />
                                        </div>
                                        <Input
                                            type={"file"}
                                            id={"image"}
                                            accept={"image/*"}
                                            name={"image"}
                                            HandleChange={handleFile}
                                            errors={errors}
                                        />
                                        <div className="row">
                                            <div className="col-md-6">
                                                <Input
                                                    type={"date"}
                                                    id={"deadline"}
                                                    name={"date"}
                                                    HandleChange={HandleChange}
                                                    errors={errors}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <Input
                                                    type={"text"}
                                                    id={"amount"}
                                                    placeholder={"Amount"}
                                                    name={"amount"}
                                                    HandleChange={HandleChange}
                                                    errors={errors}
                                                />
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row align-items-center justify-content-between">
                                            <Link to={'/dashboard'}>Back to Dashboard</Link>
                                            <button className="btn text-white" onClick={HandleSubmit}>Create Campaign</button>
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

export default CreateCampaign
