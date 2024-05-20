import React, { useEffect, useState } from 'react';
import './styles.css'
import ProgressBar from '../progressBar/ProgressBar';
import DonorList from '../DonorList/DonorList';
import axios from 'axios';
import { URL } from '../../utils/url';
import { USER } from '../../redux/constants/user';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getItem } from '../../../localStorage/getItem';
import { formatDate } from '../../utils/formatDate';
import Input from '../Input/Input';
import { toast } from 'react-toastify';
import confetti from 'canvas-confetti';


const CampaignDetails = () => {
  const [formValues, setFormValues] = useState({
    donationAmount: ''
  });
  const [errors, setErrors] = useState([]);

  const newErrors = [];

  const navigate = useNavigate();

  // Get access to the 'dispatch' function from Redux (with an empty string action type)
  const dispatch = useDispatch();

  // Extract the 'id' parameter from the current route using 'useParams' from React Router
  const { id } = useParams();

  // Retrieve user data, presumably from local storage or a similar mechanism
  const userData = getItem('user');

  // Extract 'loading' and 'data' properties from the 'product' slice of Redux state
  const { loading, data } = useSelector(state => state.campaign);
  // This useEffect fetches user campaigns from a server when 'showConfirmation' changes.
  useEffect(() => {
    // Dispatch an action to initiate the campaign fetching process
    dispatch({ type: USER.FETCH_CAMPAIGN_REQUEST });
    // Make an HTTP GET request to fetch user campaigns
    axios.post(URL + '/user/api/campaign', { id: id })
      .then(res => {
        console.log(res)
        // Transform the data, updating the 'deadLine' field
        res.data.deadLine = formatDate(res.data.deadLine);

        // Dispatch a success action with the fetched and transformed data
        dispatch({ type: USER.FETCH_CAMPAIGN_SUCCESS, payload: res.data });
      })
      .catch(err => {
        // Dispatch a failure action if there's an error during the fetch
        dispatch({ type: USER.FETCH_CAMPAIGN_FAILED });
      });

     
  }, []);


  const validateDonationAmount = () => {
    // Trim the donationAmount to remove whitespace at the beginning and the end
    const trimmedAmount = formValues.donationAmount.trim();

    // Check if the donationAmount is empty
    if (trimmedAmount === '') {
      newErrors.push({ field: 'donationAmount', message: 'Donation amount is required' });
    } else {
      // Regular expression to match a positive number greater than 0, can be an integer or a decimal
      const amountPattern = /^[1-9]\d*(\.\d+)?$/;

      // Test the donationAmount against the regex pattern
      if (!amountPattern.test(trimmedAmount)) {
        newErrors.push({ field: 'donationAmount', message: 'Invalid donation amount. Please enter a positive number.' });
      }
    }

    // checking for a maximum donation limit
    if (parseFloat(trimmedAmount) > data.amount) {
      newErrors.push({ field: 'donationAmount', message: `Donation amount cannot exceed ${data.amount}` });
    }

    return newErrors;
  };

  const HandleDonation = async (e) => {
    e.preventDefault();
    const newErrors = await validateDonationAmount(); // Validate form input and store errors
    console.log(newErrors)
    if (newErrors.length === 0) {
      console.log('hello')
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onerror = () => {
        toast.error("Something went wrong", {
          position: toast.POSITION.BOTTOM_CENTER
        });
      };
      script.onload = async () => {
        try {
          dispatch({ type: USER.PAYMENT_REQUEST });
          const result = await axios.post(URL + '/user/api/create-order', {
            amount: formValues.donationAmount + '00',
          });
          const { amount, id: order_id, currency } = result.data;
          const {
            data: { key: razorpayKey },
          } = await axios.get(URL + '/user/api/get-razorpay-key');

          const options = {
            key: razorpayKey,
            amount: amount.toString(),
            currency: currency,
            name: 'SAHAYA',
            description: 'example transaction',
            order_id: order_id,
            handler: async function (response) {
              await HandleDonationDetails(response);
            },
            prefill: {
              name: userData.name,
              contact: userData.email,
            },
            // notes: {
            //     address: formValues.address,
            // },
            theme: {
              color: '#8ebbff',
            },
          };
          dispatch({ type: USER.PAYMENT_SUCCESS });
          const paymentObject = new window.Razorpay(options);
          paymentObject.open();
        } catch (err) {
          console.log(err)
          dispatch({ type: USER.PAYMENT_FAILED });
          toast.error("something went wrong", {
            position: toast.POSITION.BOTTOM_CENTER
          });
        }
      };
      document.body.appendChild(script);
    } else {
      // Set validation errors if there are any
      setErrors(newErrors);
    }
  }

 
  
  const HandleDonationDetails = (response) => {
    axios.post(URL + '/user/api/save-donation', {
      campaignId: id,
      amount: formValues.donationAmount,
      donorId: userData.id,
      paymentStatus: 'Success',
      razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id
    }).then(res => {
      navigate('/');
        // Launch confetti animation
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });

    confetti({
      particleCount: 80,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });

    // Display "Congratulations" text
    const congratulationsText = document.createElement('div');
    congratulationsText.className = 'congratulations-text';
    congratulationsText.innerText = 'Congratulations!';
    document.body.appendChild(congratulationsText);

    // Remove "Congratulations" text after a few seconds
    setTimeout(() => {
      document.body.removeChild(congratulationsText);
    }, 2000); // Adjust duration as needed
      // Display a success message using a toast notification
      toast.success(res.data.message, {
        position: toast.POSITION.BOTTOM_CENTER
      });
    }).catch(err => {
      toast.error("something went wrong", {
        position: toast.POSITION.BOTTOM_CENTER
      });
    })
  }

  const donors = [
    {
      name: 'John Doe',
      amount: 50,
      date: '2024-03-17 09:30:00'
    },
    {
      name: 'Jane Smith',
      amount: 100,
      date: '2024-03-16 15:45:00'
    },
    {
      name: 'Alice Johnson',
      amount: 25,
      date: '2024-03-15 12:00:00'
    }
    // Add more donor objects as needed
  ];

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
    data &&
    <div className="campaignDetails container">
      <div className="row mt-5">
        <div className="col-md-8">
          {/* Campaign Image */}
          <img src={URL + '/' + data.img} className="d-block w-100 campaign_img img-fluid" alt="Campaign Image" />

          {/* Other Details of the Campaign */}
          <div className="mt-4 other-campaign-details ">
            <p>{data.disease}</p>
            <p>{data.about}</p>

            {/* Display Campaign Deadline */}
            <p>Deadline: {data.deadline}</p>

            {/* Display Campaign Address */}
            <p>Address: {data.address}</p>
          </div>

          {/* Campaign Donation Tracker */}
          <div>
            <h2>Campaign Donation Tracker</h2>
            <DonorList id={id}/>
          </div>
        </div>

        <div className="col-md-4">
          {/* Donation Amount */}
          <div className="mb-4">
            <h2>Donation DeadLine</h2>
            <p className='donation_deadLine'>{data.deadLine} </p>
          </div>

          {/* Progress Bar */}
          <ProgressBar id={id} amount={data.amount} />

          {/* Donate Button */}
          <div>
            <Input type={'text'} placeholder={"Enter amount"} name={"donationAmount"} HandleChange={HandleChange} errors={errors} />
            <button
              type="button"
              className="btn donate-btn w-100 "
              onClick={(e) => HandleDonation(e)}
            >
              Donate Now
            </button>
          </div>
        </div>
      </div>
    </div>

  );
}

export default CampaignDetails;
