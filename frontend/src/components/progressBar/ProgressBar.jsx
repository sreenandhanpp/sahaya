import React, { useEffect, useState } from 'react';
import './style.css'; // Import the CSS file
import axios from 'axios';
import { URL } from '../../utils/url';
import { useDispatch, useSelector } from 'react-redux';
import { USER } from '../../redux/constants/user';

const ProgressBar = ({ amount,id }) => {
  const [currentStatus, setCurrentStatus] = useState(0);
  const [value ,setValue] = useState(0);
  const [fade, setFade] = useState(false); // State for fade-in animation
  const dispatch = useDispatch();
  const { loading, totalAmountCollected } = useSelector(state => state.totalAmount);


  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentStatus(value);
      setFade(true); // Trigger fade-in animation
    }, 200); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, [value]);

  useEffect(() => {
    dispatch({ type: USER.FETCH_TOTAL_AMOUNT_REQUEST });
    axios.get(URL + '/user/api/total-amount-donated/' + id)
      .then(res => {
        dispatch({ type: USER.FETCH_TOTAL_AMOUNT_SUCCESS, payload: res.data.totalAmountCollected });
        let collectedPercentage =  (res.data.totalAmountCollected/amount) * 100;
        const collectedRoundedPercentage =  Math.round(collectedPercentage);
        setValue(collectedRoundedPercentage);
        console.log(collectedRoundedPercentage)
        console.log(res)
      })
      .catch(err => {
        console.log('Error fetching donors:', err);
        dispatch({ type: USER.FETCH_TOTAL_AMOUNT_FAILED });

      });
  }, []);

  return (
    <div className={`mb-4 ${fade ? 'fade-in' : ''}`}> {/* Apply fade-in class conditionally */}
      <h2>Money Collected</h2>
      <div className="progress-container"> {/* Use a separate container for the progress bar */}
        <div
          className="progress-bar"
          style={{ width: `${currentStatus}%` }} // Set the width dynamically
          aria-valuenow={currentStatus}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {currentStatus}% {/* Display the current progress percentage */}
        </div>
      </div>
      <p className="mt-3 small-text">Total amount collected: {totalAmountCollected} of {amount} goal</p>
    </div>
  );
};

export default ProgressBar;
