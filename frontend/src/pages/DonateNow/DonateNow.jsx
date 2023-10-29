import React from 'react'
import Campaigns from '../../components/Campaigns/Campaigns'
import './style.css'

const DonateNow = () => {
    return (
        <section className='donate-now'>
            <div class="container py-5">
                <div className="row">
                    <div className="col-md-6 col-sm-6 col-8 text-start">
                        <h1 class="">Donate Now</h1>
                    </div>
                    <div className="col-md-6 col-sm-6 col-4 text-end">
                        <button className='text-white view-all btn'>All <i class="fa-solid fa-arrow-right-to-bracket"></i> </button>
                    </div>
                </div>
                <div className="row row-cols-1 row-cols-md-3 g-4 py-5">
                    <Campaigns />
                    <Campaigns />
                    <Campaigns />
                    <Campaigns />
                    <Campaigns />
                    <Campaigns />

                </div>
            </div>
        </section>
    )
}

export default DonateNow
