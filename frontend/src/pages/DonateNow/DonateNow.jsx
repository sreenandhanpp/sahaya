import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Campaigns from '../../components/Campaigns/Campaigns';
import { USER } from '../../redux/constants/user';
import axios from 'axios';
import { URL } from '../../utils/url';
import { formatDate } from '../../utils/formatDate';

const DonateNow = () => {
    const dispatch = useDispatch();
    const { loading, data } = useSelector(state => state.allCampaigns);

      // This useEffect fetches user campaigns from a server when 'showConfirmation' changes.
      useEffect(() => {
        // Dispatch an action to initiate the campaign fetching process
        dispatch({ type: USER.FETCH_CAMPAIGNS_REQUEST });

        // Make an HTTP GET request to fetch user campaigns
        axios.get(URL + '/user/api/campaigns')
            .then(res => {
                console.log(res)
                // Transform the data, updating the 'deadLine' field
                const updatedData = res.data.map((value) => {
                    return {
                        ...value,
                        deadLine: formatDate(value.deadLine)
                    };
                });

                // Dispatch a success action with the fetched and transformed data
                dispatch({ type: USER.FETCH_CAMPAIGNS_SUCCESS, payload: updatedData });
            })
            .catch(err => {
                // Dispatch a failure action if there's an error during the fetch
                dispatch({ type: USER.FETCH_CAMPAIGNS_FAILED });
            });
    }, []); // Reload campaigns when 'showConfirmation' changes


    return (
        <section className='donate-now'>
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-6 col-sm-6 col-8 text-start">
                        <h1 className="">Donate Now</h1>
                    </div>
                    <div className="col-md-6 col-sm-6 col-4 text-end">
                        <button className='text-white view-all btn'>All <i className="fa-solid fa-arrow-right-to-bracket"></i> </button>
                    </div>
                </div>
                <div className="row row-cols-1 row-cols-md-3 g-4 py-5">
                    { data && data.map(campaign => (
                        <Campaigns key={campaign._id} campaign={campaign} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default DonateNow;
