import React from 'react';
import './Logout.css';

const Logout = () => {

    const handleLogout = () => {
        // Perform logout actions here
        // For example, clear user data from localStorage, Redux store, or session
        // Then redirect to the login page or any other desired page
        // Here, for demonstration purposes, I'm simply redirecting to the login page
    };

    return (
        <div className="container mt-5 logout">
            <div className="row">
                <div className="col-md-12">
                    <div className="">
                        <div className="text-center align-items-center justify-content-center">
                            <h2 className="">Are you sure you want to logout?</h2>
                            <p className="">You will be logged out of your account.</p>
                            <button className="btn logout-btn" onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Logout;
