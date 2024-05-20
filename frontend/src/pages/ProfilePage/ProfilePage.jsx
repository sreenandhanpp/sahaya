import React, { useState } from 'react';
import styles from './ProfilePage.module.css'; // Import module CSS file
import { URL } from '../../utils/url';
import { NavLink, useLocation } from 'react-router-dom'; // Import useLocation hook
import UserDetailsUpdate from '../../components/UserDetailsUpdate/UserDetailsUpdate';
import DonationHistory from '../../components/DonationHistory/DonationHistory';
import ChangePassword from '../../components/ChangePassword/ChangePassword';
import Logout from '../../components/Logout/Logout';
import axios from 'axios';
import { setItem } from '../../../localStorage/setItem';
import { toast } from 'react-toastify';
import { USER } from '../../redux/constants/user';
import { useDispatch } from 'react-redux';
import { getItem } from '../../../localStorage/getItem';

const ProfilePage = () => {
    const [profilePic, setProfilePic] = useState(null);
    const location = useLocation();
    const dispatch = useDispatch();
    const userData = getItem('user');

    const handleProfilePicChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfilePic(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
        handleProfileUpdate(selectedFile);
    };

    const handleProfileUpdate = (selectedFile) => {
        const formData = new FormData();
        formData.append('profile', selectedFile);
        try {
            dispatch({ type: USER.UPDATE_USER_DATA_REQUEST });
            // Make HTTP request to update user details
            axios.put(URL + `/user/api/update-user/${userData._id}`, formData).then(resp => {
                setItem('user', resp.data.userData);
                dispatch({ type: USER.UPDATE_USER_DATA_REQUEST });
                // Handle successful update
                toast.success("Profile pic updated successfully", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            })
        } catch (error) {
            // Handle error
            dispatch({ type: USER.UPDATE_USER_DATA_FAILED });
            console.log(error)
            toast.error(error.response.data.message, {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }
    }

    return (
        <div className={`container ${styles.profilePage}`}>
            <div className="row">
                <div className="col-md-4">
                    <div className={styles.profile_picture_wrapper}>
                        <div className={styles.profilePicture}>
                            <img src={profilePic ? profilePic : userData.profile ? `${URL}/${userData.profile}` : '/images/default-profile-pic.png'} alt="Profile" className={`${styles.profile_picture} img-fluid rounded-circle`} />
                            <input type="file" accept="image/*" onChange={handleProfilePicChange} className="d-none" />
                        </div>
                        <div className={styles.profile_btn_wrapper}>
                            <button onClick={() => document.querySelector('input[type=file]').click()} className={`btn  mt-2 ${styles.profile_btn}`}><i class="fa-solid fa-plus"></i></button>
                        </div>
                    </div>
                    <ul className={`${styles.nav_list} nav flex-column`}>
                        <li className="nav-item">
                            <NavLink to="/user/profile" className="nav-link" activeClassName={styles.active}>Profile</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/user/history" className="nav-link" activeClassName={styles.active} exact>Donation History</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/user/password" className="nav-link" activeClassName={styles.active} exact>Change Password</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/user/logout" className="nav-link" activeClassName={styles.active} exact>Logout</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="col-md-8">
                    <div style={{ maxHeight: '500px', overflowY: 'auto',overflowX: 'hidden' }}>
                        {/* Render content based on current URL */}
                        {location.pathname === '/user/history' ? <DonationHistory /> : <UserDetailsUpdate />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
