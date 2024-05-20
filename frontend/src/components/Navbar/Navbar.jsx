import React, { useEffect } from 'react'
import './style.css'
import { getItem } from '../../../localStorage/getItem';
import { removeItem } from '../../../localStorage/removeItem';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const userData =  getItem('user')
    const navigate = useNavigate();

    useEffect(() => {
        const nav = document.querySelector("nav");
        function handleScroll() {
            if (window.pageYOffset > 100) {
                nav.style.backgroundColor = '#30a4e3'; // Change the background color
                nav.classList.add("shadow");
            } else {
                nav.style.backgroundColor = 'transparent'; // Reset to the default background color
                nav.classList.remove("shadow");
            }
        }
        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    const handleLogout = () =>{
        removeItem('user')
        navigate('/login')
    }
    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark p-md-3">
            <div className="container">
                <a className="navbar-brand " href="#">SAHAYA </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="mx-auto"></div>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link text-white" > {userData && userData?.fullname }</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white logout" onClick={handleLogout}>#logout</a>
                        </li>
                    
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default Navbar
