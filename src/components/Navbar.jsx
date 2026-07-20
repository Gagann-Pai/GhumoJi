import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../App.css';
import logo from '../assets/logo.svg';

const userApi = "https://tourism-backend-x2h9.onrender.com/api/users";

function Navbar({ onStateSelect, resetHome, currentUser, setCurrentUser }) {
    const [statesList, setStatesList] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchStates() {
            try {
                const response = await axios.get("https://tourism-backend-x2h9.onrender.com/api/places/states");
                setStatesList(response.data);
            } catch (err) {
                console.log("Failed to load states");
            }
        }
        fetchStates();
    }, []);

    async function handleLogout() {
        try {
            await axios.post(`${userApi}/logout`, {}, { withCredentials: true });
            setCurrentUser(null);
            navigate("/");
        } catch (err) {
            console.log("Logout failed");
        }
    }

    let dropdownContent = null;
    if (showDropdown) {
        dropdownContent = (
            <div className="dropdown-box">
                {statesList.map((state) => (
                    <div
                        key={state}
                        className="dropdown-item"
                        onClick={() => {
                            onStateSelect(state);
                            setShowDropdown(false);
                        }}
                    >
                        {state}
                    </div>
                ))}
            </div>
        );
    }

    // ONE slot in the navbar that changes based on login status
    let rightSlot = null;

    if (!currentUser) {
        rightSlot = <Link to="/signup" className="navadmin">Sign Up</Link>;
    } else if (currentUser.role === "admin") {
        rightSlot = <Link to="/admin" className="navadmin">Admin</Link>;
    } else {
        rightSlot = <Link to="/favorites" className="navadmin">Liked</Link>;
    }

    let logoutButton = null;
    if (currentUser) {
        logoutButton = <button className="logout-btn" onClick={handleLogout}>Logout</button>;
    }

    return (
        <div className="navbar">
            <div className="navlogo">
                <img src={logo} alt="logo" />                
                <p>GhumoJi</p>
            </div>
            <div className="navlink">
            <Link to="/" onClick={() => { resetHome(); }}> Home </Link>               
            <a href="#about-section">About</a>
                <a href="#contact-section">Contact</a>
                
                <div className="container">
                    <button 
                        className="dropdown-btn" 
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        States
                    </button>
                    
                    {dropdownContent}
                </div>

                {rightSlot}
                {logoutButton}
            </div>
        </div>
    )
}

export default Navbar;