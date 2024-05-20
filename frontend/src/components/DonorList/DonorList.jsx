import React, { useEffect, useState } from 'react';
import './style.css';
import axios from 'axios';
import { URL } from '../../utils/url';
import { useDispatch, useSelector } from 'react-redux';
import { USER } from '../../redux/constants/user';
import { formatDate } from '../../utils/formatDate';

const DonorList = ({ id }) => {
  const dispatch = useDispatch();
  const { loading, donors } = useSelector(state => state.fetchDonors);

  // const [likedDonors, setLikedDonors] = useState([]);
  // const [likeCounts, setLikeCounts] = useState(donors.map(() => 0));

  // const handleLike = (index) => {
  //   const newLikedDonors = likedDonors.includes(index)
  //     ? likedDonors.filter((item) => item !== index)
  //     : [...likedDonors, index];

  //   setLikedDonors(newLikedDonors);

  //   const newLikeCounts = likeCounts.map((count, i) =>
  //     i === index ? (newLikedDonors.includes(index) ? count + 1 : count - 1) : count
  //   );

  //   setLikeCounts(newLikeCounts);
  // };
  useEffect(()=>{
    dispatch({ type: USER.FETCH_DONORS_REQUEST });
    axios.get(URL + '/user/api/donors/' + id)
    .then(res => {
    dispatch({ type: USER.FETCH_DONORS_SUCCESS,payload: res.data.donors});
      console.log(res)
    })
    .catch(err => {
      console.log('Error fetching donors:', err);
    dispatch({ type: USER.FETCH_DONORS_FAILED });

    });
  },[])

  return (
    <div className="donor-list">
      <ul className="donor-names">
        {donors.map((donor, index) => (
          <li key={index} className="donor-item" data-aos="fade-up"  data-aos-duration="2000">
            <div className="donor-profile"></div>
            <div className="donor-info">
              <p className="donor-name">{donor.fullname}</p>
              <p className="donor-amount">${donor.amount}</p>
              <p className="donor-date">{formatDate(donor.createdAt)}</p>
              <div className="like-container">
                {/* <i
                  className={`like-icon fas fa-heart ${likedDonors.includes(index) ? 'liked' : ''}`}
                  onClick={() => handleLike(index)}
                ></i> */}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DonorList;
