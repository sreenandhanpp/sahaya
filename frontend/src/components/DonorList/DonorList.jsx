import React, { useState } from 'react';
import './style.css';

const DonorList = ({ donors }) => {
  const [likedDonors, setLikedDonors] = useState([]);
  const [likeCounts, setLikeCounts] = useState(donors.map(() => 0));

  const handleLike = (index) => {
    const newLikedDonors = likedDonors.includes(index)
      ? likedDonors.filter((item) => item !== index)
      : [...likedDonors, index];

    setLikedDonors(newLikedDonors);

    const newLikeCounts = likeCounts.map((count, i) =>
      i === index ? (newLikedDonors.includes(index) ? count + 1 : count - 1) : count
    );

    setLikeCounts(newLikeCounts);
  };

  return (
    <div className="donor-list">
      <ul className="donor-names">
        {donors.map((donor, index) => (
          <li key={index} className="donor-item" data-aos="fade-up"  data-aos-duration="2000">
            <div className="donor-profile"></div>
            <div className="donor-info">
              <p className="donor-name">{donor.name}</p>
              <p className="donor-amount">${donor.amount}</p>
              <p className="donor-date">{donor.date}</p>
              <div className="like-container">
                <i
                  className={`like-icon fas fa-heart ${likedDonors.includes(index) ? 'liked' : ''}`}
                  onClick={() => handleLike(index)}
                ></i>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DonorList;
