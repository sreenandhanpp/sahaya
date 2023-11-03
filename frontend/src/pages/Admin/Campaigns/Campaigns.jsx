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

const Campaigns = () => {
    const dispatch = useDispatch();
    const { data, loading } = useSelector(state => state.allCampaigns);
    const [showConfirmation, setShowConfirmation] = useState(false); // State for confirmation modal

    const [campaignToDelete, setCampaignToDelete] = useState(null); // Store campaign to delete

    useEffect(() => {
        dispatch({ type: USER.FETCH_CAMPAIGNS_REQUEST });
        axios.get(URL + '/user/api/campaigns')
            .then(res => {
                const updatedData = res.data.map((value) => {
                    return {
                        ...value,
                        deadLine: formatDate(value.deadLine)
                    };
                });
                dispatch({ type: USER.FETCH_CAMPAIGNS_SUCCESS, payload: updatedData });
            })
            .catch(err => {
                dispatch({ type: USER.FETCH_CAMPAIGNS_FAILED });
            });
    }, [showConfirmation]); // Reload campaigns when showConfirmation changes

    const HandleDelete = (campaign) => {
        setCampaignToDelete(campaign);
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
        setShowConfirmation(false);
        setCampaignToDelete(null); // Reset the campaign to delete
    };
    
    useEffect(() => {
        if (showConfirmation) {
            document.getElementById('backgroundOverlay').style.display = 'block';
        } else {
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
                </div>
            </div>
            <ConfirmDeletion ConfirmDelete={ConfirmDelete} CancelDelete={CancelDelete} showConfirmation={showConfirmation} />

        </section>
    );
};

export default Campaigns;
