import React, { useEffect, useState } from 'react';
import './style.css'; // Import the CSS file

const ProgressBar = ({ value,amount }) => {
  const [currentStatus, setCurrentStatus] = useState(0);
  const [fade, setFade] = useState(false); // State for fade-in animation

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentStatus(value);
      setFade(true); // Trigger fade-in animation
    }, 200); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, [value]);

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
      <p className="mt-3 small-text">Total amount collected: $500 of {amount} goal</p>
    </div>
  );
};

export default ProgressBar;
