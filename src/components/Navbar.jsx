import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar({ onStateSelect, resetHome, currentUser, setCurrentUser }) {
    const navigate = useNavigate();
    const [showStates, setShowStates] = useState(false);
    const [statesList, setStatesList] = useState([]);

    useEffect(() => {
        async function fetchStates() {
            try {
                const response = await axios.get("https://tourism-backend-x2h9.onrender.com/api/places/states");
                setStatesList(response.data);
            } catch (err) {
                console.error("Failed to load states", err);
            }
        }
        fetchStates();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post(
                "https://tourism-backend-x2h9.onrender.com/api/users/logout", 
                {}, 
                { withCredentials: true }
            );
            setCurrentUser(null);
            resetHome();
            navigate("/");
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    return (
        <div className="navbar">
            <div className="navlogo" onClick={resetHome}>
                <p>GhumoJi</p>
            </div>

            <div className="navlink">
                <Link to="/" onClick={resetHome}>Home</Link>
                <a href="#about-section">About</a>
                <a href="#contact-section">Contact</a>

                {currentUser ? (
                    <>
                        <div 
                            className="container" 
                            onMouseEnter={() => setShowStates(true)} 
                            onMouseLeave={() => setShowStates(false)}
                        >
                            <button className="dropdown-btn">States ▾</button>
                            {showStates && (
                                <div className="dropdown-box">
                                    {statesList.map((state) => (
                                        <div 
                                            key={state} 
                                            className="dropdown-item"
                                            onClick={() => {
                                                onStateSelect(state);
                                                setShowStates(false);
                                                navigate("/");
                                            }}
                                        >
                                            {state}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {currentUser.role === "admin" && (
                            <Link to="/admin" className="navadmin">Admin</Link>
                        )}
                        
                        <span className="user-greeting">
                            Hi, {currentUser.name}!
                        </span>
                        
                        <button onClick={handleLogout} className="logout-btn">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="login-link">Login</Link>
                        <Link to="/signup" className="signup-btn-nav">Sign Up</Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default Navbar;