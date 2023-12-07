import React, { useEffect, useState } from 'react';
import Campaign from '../../../components/Admin/Campaign/Campaign';
import './style.css';
import { Link } from 'react-router-dom';
import { URL } from '../../../utils/url';
import { formatDate } from '../../../utils/formatDate';
import { useDispatch, useSelector } from 'react-redux';
import { USER } from '../../../redux/constants/user';
import axios from 'axios';
import ConfirmDeletion from '../../../components/Admin/ConfirmDeletion/ConfirmDeletion';
import { ADMIN } from '../../../redux/constants/admin';
import Loader from '../../../components/Loader/Loader';

const Campaigns = () => {
    const dispatch = useDispatch();

    // Destructure 'data' and 'loading' from the state using the useSelector hook.
    const { data, loading } = useSelector(state => state.allCampaigns);

    const [showConfirmation, setShowConfirmation] = useState(false); // State for confirmation modal

    const [campaignToDelete, setCampaignToDelete] = useState(null); // Store campaign to delete

    // This useEffect fetches user campaigns from a server when 'showConfirmation' changes.
    useEffect(() => {
        // Dispatch an action to initiate the campaign fetching process
        dispatch({ type: USER.FETCH_CAMPAIGNS_REQUEST });

        // Make an HTTP GET request to fetch user campaigns
        axios.get(URL + '/user/api/campaigns')
            .then(res => {
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
    }, [showConfirmation]); // Reload campaigns when 'showConfirmation' changes

    const HandleDelete = (campaign) => {
        // Set the 'campaignToDelete' state to the specified campaign
        setCampaignToDelete(campaign);

        // Show the confirmation modal
        setShowConfirmation(true);
    };

    const ConfirmDelete = () => {
        if (campaignToDelete) {
            try {
                dispatch({ type: ADMIN.DELETE_CAMPAIGN_REQUEST });
                axios.post(URL + '/admin/api/delete-campaign', {
                    id: campaignToDelete._id
                })
                    .then(res => {
                        dispatch({ type: ADMIN.CREATE_CAMPAIGN_SUCCESS });
                        setShowConfirmation(false); // Close the confirmation dialog
                        setCampaignToDelete(null); // Reset the campaign to delete

                        // Display a success message using a toast notification
                        toast.success(res.data.message, {
                            position: toast.POSITION.BOTTOM_CENTER
                        });
                    })
                    .catch(err => {
                        // Display a error message using a toast notification
                        toast.error(err.response.message, {
                            position: toast.POSITION.BOTTOM_CENTER
                        });
                    });
            } catch (error) {
                // Display a error message using a toast notification
                toast.error("Something went wrong try again", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            }
        }
    };

    const CancelDelete = () => {
        // Hide the confirmation modal
        setShowConfirmation(false);

        // Reset the 'campaignToDelete' state to null
        setCampaignToDelete(null);
    };


    // This useEffect updates the visibility of an overlay element based on the 'showConfirmation' state.
    useEffect(() => {
        if (showConfirmation) {
            // If 'showConfirmation' is true, display the overlay element
            document.getElementById('backgroundOverlay').style.display = 'block';
        } else {
            // If 'showConfirmation' is false, hide the overlay element
            document.getElementById('backgroundOverlay').style.display = 'none';
        }
    }, [showConfirmation]);


    return (
        <section className='donate-now'>
            <div className={`overlay ${showConfirmation ? 'show' : ''}`} id="backgroundOverlay"></div>
            <div class="container py-5">
                <div className="row">
                    <div className="col-md-6 col-sm-6 col-8 text-start">
                        <h1 class="">Campaigns</h1>
                    </div>
                    <div className="col-md-6 col-sm-6 col-4 text-end">
                        <Link to={'/create-campaign'} ><button className='text-white create-btn btn'><i class="fa-solid fa-plus"></i> </button> </Link>
                    </div>
                </div>
                {
                    loading ?
                        <Loader />
                        :
                        <div className="row row-cols-1 row-cols-md-3 g-4 py-5">
                            {data &&
                                data.map(value => {
                                    return (
                                        <Campaign
                                            value={value}
                                            onDelete={() => HandleDelete(value)} // Pass the onDelete function
                                        />
                                    );
                                })}
                        </div>}
            </div>
                <ConfirmDeletion ConfirmDelete={ConfirmDelete} CancelDelete={CancelDelete} showConfirmation={showConfirmation} />

        </section>
    );
};

export default Campaigns;
