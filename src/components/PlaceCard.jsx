import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';

import left_arrow from '../assets/left-arrow.png';
import right_arrow from '../assets/right-arrow.png';

function PlaceCard({ places, title, subtitle, currentUser }) {
    const navigate = useNavigate();
    const sliderRef = useRef(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);

    const checkScroll = () => {
        const slider = sliderRef.current;
        if (slider) {
            setShowLeft(slider.scrollLeft > 10);
            setShowRight(slider.scrollLeft < slider.scrollWidth - slider.clientWidth - 10);
        }
    };

    useEffect(() => {
        checkScroll();
    }, [places]);

    const scrollLeft = () => {
        sliderRef.current.scrollBy({ left: -380, behavior: "smooth" });
        setTimeout(checkScroll, 300);
    };

    const scrollRight = () => {
        sliderRef.current.scrollBy({ left: 380, behavior: "smooth" });
        setTimeout(checkScroll, 300);
    };

    const handleCardClick = (placeId) => {
        if (currentUser) {
            navigate(`/place/${placeId}`);
        } else {
            setShowLoginPopup(true);
        }
    };

    return (
        <section className="fplaces">
            <h2>{title || "Explore Tourist Places"} <span>{subtitle || "Handpicked destinations for your next trip."}</span></h2>
            
            {showLoginPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h3>Authentication Required 🔒</h3>
                        <p>You must be logged in to view place details and plan your trip.</p>
                        <div className="popup-buttons">
                            <button onClick={() => navigate('/login')} className="popup-login-btn">Login Now</button>
                            <button onClick={() => setShowLoginPopup(false)} className="popup-close-btn">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="slider-wrapper">
                {showLeft && (
                    <button className="arrow left" onClick={scrollLeft}>
                        <img src={left_arrow} alt="left arrow" />
                    </button>
                )}
                <div className="cards" ref={sliderRef} onScroll={checkScroll}>
                    {places.map((place) => (
                        <div 
                            key={place._id} 
                            className="card" 
                            onClick={() => handleCardClick(place._id)} 
                            style={{ backgroundImage: `url(${place.image})` }}
                        >
                            <div className="overlay">
                                <p className="tag">{place.city}, {place.state}</p>
                                <h3>{place.name}</h3>
                                <p className="desc">{place.description}</p>
                                <p className="rating">⭐ {place.rating}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {showRight && (
                    <button className="arrow right" onClick={scrollRight}>
                        <img src={right_arrow} alt="right arrow" />
                    </button>
                )}
            </div>
        </section>
    );
}

export default PlaceCard;