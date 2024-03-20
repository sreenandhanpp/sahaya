import React, { useEffect } from 'react';
import './styles.css'
import ProgressBar from '../progressBar/ProgressBar';
import DonorList from '../DonorList/DonorList';
import axios from 'axios';
import { URL } from '../../utils/url';
import { USER } from '../../redux/constants/user';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getItem } from '../../../localStorage/getItem';
import { formatDate } from '../../utils/formatDate';


const CampaignDetails = () => {
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
  axios.post(URL + '/user/api/campaign',{ id:id })
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
   
console.log(data)


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
          <DonorList donors={donors} />
        </div>
      </div>
  
      <div className="col-md-4">
        {/* Donation Amount */}
        <div className="mb-4">
          <h2>Donation DeadLine</h2>
          <p className='donation_deadLine'>{data.deadLine} </p>
        </div>
  
        {/* Progress Bar */}
        <ProgressBar value="30" amount={data.amount} />
  
        {/* Donate Button */}
        <div>
          <div className="form-group">
            <input type="number" className="form-control" id="donationAmount" placeholder="Enter amount" />
          </div>
          <button
            type="button"
            className="btn donate-btn w-100 "
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
