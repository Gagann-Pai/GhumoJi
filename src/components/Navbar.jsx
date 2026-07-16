import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../App.css';
import logo from '../assets/logo.svg';

function Navbar({ onStateSelect, resetHome }) {
    const [statesList, setStatesList] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

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
                    
                    {showDropdown && (
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
                    )}
                </div>

                <Link to="/admin" className="navadmin">Admin</Link>
            </div>
        </div>
    )
}

export default Navbar;