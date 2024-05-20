import React from 'react';
import AppCard from '../Card/Card';

const DonationHistoryCard = ({ donation }) => {
    return (
        <AppCard>

        <div className="" style={{ maxWidth: '540px' }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={donation.campaignImage} className="img-fluid rounded-start" alt="Campaign" />
                </div>
                <div className="col-md-8 d-flex align-items-center">
                    <div className="">
                        <h5 className="">{donation.campaignName}</h5>
                        <p className="">Amount: ${donation.amount}</p>
                        <p className=""><small className="text-muted">Date: {donation.date}</small></p>
                    </div>
                </div>
            </div>
        </div>
        </AppCard>
    );
};

// Example data for donation history
const exampleDonations = [
    {
        campaignImage: 'https://via.placeholder.com/150',
        campaignName: 'Education for All',
        amount: 50,
        date: '2024-04-10',
    },
    {
        campaignImage: 'https://via.placeholder.com/150',
        campaignName: 'Clean Water Initiative',
        amount: 100,
        date: '2024-04-08',
    },
    {
        campaignImage: 'https://via.placeholder.com/150',
        campaignName: 'Food for the Needy',
        amount: 25,
        date: '2024-04-05',
    },
];

const DonationHistory = () => {
    return (
        <div className="">
            <h2>Donation History</h2>
            <div className="row">
                {exampleDonations.map((donation, index) => (
                    <div key={index} className="col-lg-12 mb-4">
                        <DonationHistoryCard donation={donation} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DonationHistory;
