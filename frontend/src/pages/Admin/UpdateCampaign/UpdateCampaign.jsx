import React, { useEffect, useState } from 'react'
import Input from '../../../components/Input/Input'
import { URL } from '../../../utils/url';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Alert from '../../../components/Alert/Alert';
import { USER } from '../../../redux/constants/user';
import { ADMIN } from '../../../redux/constants/admin';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import './style.css'
import Loader from '../../../components/Loader/Loader';

const UpdateCampaign = () => {
    const [errors, setErrors] = useState([]);
    const [img, setImg] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
        id: ''
    });

    const { loading } = useSelector(state => state.campaign);
    const { updatedLoading } = useSelector(state => state.updatedData);

    useEffect(() => {
        dispatch({ type: USER.FETCH_CAMPAIGN_REQUEST });
        axios.post(URL + '/user/api/campaign', {
            id: id
        }).then(res => {
            setFormValues((prev) => {
                return {
                    ...prev,
                    fullname: res.data.fullname,
                    address: res.data.fullname,
                    disease: res.data.disease,
                    amount: res.data.amount,
                    date: res.data.deadLine,
                    account_no: res.data.account_no,
                    ifsc: res.data.ifsc,
                    id: res.data._id
                }
            });
            const imgUrl = `${URL}/${res.data.img}`
            setCurrentImage(imgUrl);
            dispatch({ type: USER.FETCH_CAMPAIGN_SUCCESS, payload: res.data })
        }).catch(err => {
            dispatch({ type: USER.FETCH_CAMPAIGN_FAILED, payload: err.response.data.message })
        })
    }, []);

    const newErrors = [];
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
            formData.append('id', formValues.id);

            try {
                // Dispatch an action to indicate the start of the campaign creation process
                dispatch({ type: ADMIN.UPDATE_CAMPAIGN_REQUEST });

                // Make an HTTP POST request to create a new campaign
                axios.post(URL + '/admin/api/update-campaign', formData)
                    .then(res => {
                        console.log(res);
                        if (res.status === 200) {
                            // If the creation is successful, dispatch a success action
                            dispatch({ type: ADMIN.UPDATE_CAMPAIGN_SUCCESS });

                            // Redirect to '/dashboard' route
                            navigate('/dashboard', { replace: true });

                            // Display a success message using a toast notification
                            toast.success(res.data.message, {
                                position: toast.POSITION.BOTTOM_CENTER
                            });

                        }
                    })
                    .catch(err => {
                        console.log(err);
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
        const file = e.target.files[0]
        setImg(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setCurrentImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
        const updatedErrors = errors.filter((error) => error.field !== fieldName);
        setErrors(updatedErrors);
    }


    return (
        loading || updatedLoading ?
            <Loader />
            :
            <div className="update-campaign create-campaign">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-md-8">
                            <div className="card">
                                <h2 className="card-title text-center">Update Campaign</h2>
                                <div className="card-body py-md-4">
                                    <form _lpchecked="1">
                                        <Input
                                            type={"text"}
                                            id={"fullname"}
                                            placeholder={"Full Name"}
                                            name={'fullname'}
                                            HandleChange={HandleChange}
                                            errors={errors}
                                            value={formValues.fullname}
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
                                                    value={formValues.account_no}
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
                                                    value={formValues.ifsc}
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
                                                value={formValues.disease}
                                            />
                                            <Alert errors={errors} label={'disease'} />
                                        </div>
                                        <div className="form-group">
                                            <textarea
                                                className="form-control"
                                                id="address"
                                                placeholder="Address"
                                                name="address"
                                                onChange={(e) => HandleChange(e, 'address')}
                                                value={formValues.address}
                                            />
                                            <Alert errors={errors} label={'address'} />
                                        </div>
                                        <div className="form-group">
                                            <img
                                                src={currentImage}
                                                alt="Current Image"
                                                className="img img-fluid" // Add the Bootstrap classes
                                            />
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
                                                    value={formValues.date}
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
                                                    value={formValues.amount}
                                                />
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row align-items-center justify-content-between">
                                            <Link to={'/dashboard'}>Back to Dashboard</Link>
                                            <button className="btn text-white" onClick={HandleSubmit}>Update Campaign</button>
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

export default UpdateCampaign
