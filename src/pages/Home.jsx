import { useState, useEffect } from "react";
import axios from "axios";
import PlaceCard from "../components/PlaceCard";

const api = "https://tourism-backend-x2h9.onrender.com/api/places";

function Home({ selectedState, searchResults }) {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchPlaces() {
            try {
                setLoading(true);
                setError("");

                if (selectedState) {
                    const response = await axios.get(`${api}/state/${selectedState}`);
                    setPlaces(response.data);
                } else {
                    const response = await axios.get(api);

                        const featuredPlaces = response.data.filter(place =>
                          place.name === "Taj Mahal" ||
                          place.name === "Hampi" ||
                          place.name === "Mysore Palace" ||
                          place.name === "Charminar" ||
                          place.name === "Ajanta Caves" ||
                          place.name === "Konark Sun Temple"
    );

    setPlaces(featuredPlaces);
}
            } catch (err) {
                setError("Failed to load places!!");
            } finally {
                setLoading(false);
            }
        }

        fetchPlaces();
    }, [selectedState]);

    // decide what to show: search results win over state filter, which wins over default
    let displayedPlaces = places;
    let heading = "Explore Tourist Places";
    let subheading = "Handpicked destinations for your next trip.";

    if (searchResults && searchResults.length > 0) {
        displayedPlaces = searchResults;
        heading = "Search Results";
        subheading = "";
    } else if (selectedState) {
        heading = `Places in ${selectedState}`;
        subheading = "";
    }

    let statusMessage = null;
    if (loading) {
        statusMessage = <p>Loading places...</p>;
    } else if (error) {
        statusMessage = <div className="error">{error}</div>;
    }

    return (
        <div className="home" id="home-section">
            {statusMessage}
            <PlaceCard places={displayedPlaces} title={heading} subtitle={subheading} />

            <section className="about-section" id="about-section">
                <h2>About Us</h2>
                <p>
                    Welcome to Tourist Places Explorer, your digital companion for discovering
                    incredible travel destinations across India. We help you browse, search,
                    and filter through curated locations to find your next perfect getaway.
                    Every destination includes essential details like entry fees, ratings,
                    and the best time of year to visit, so you can plan your trip with confidence.
                </p>
            </section>

            <section className="contact-section" id="contact-section">
                <h2>Contact Us</h2>
                <div className="contact-links">
                    <a href="https://twitter.com/ghumoji" target="_blank" rel="noopener noreferrer">Twitter</a>
                    <a href="https://facebook.com/ghumoji" target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                    <a href="https://instagram.com/ghumoji" target="_blank" rel="noopener noreferrer">Instagram</a>
                    <a href="tel:+919876543210">Phone: +91 98765 43210</a>
                    <a href="mailto:ghumoji@gmail.com">Email: ghumoji@gmail.com</a>
                </div>
            </section>
            <footer className="site-footer">
                <p className="footer-brand">GhumoJi</p>
                <p className="footer-copyright">© 2026 GhumoJi. Your Journey Starts Here.</p>
                <div className="footer-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#contact-section">Contact Us</a>
                </div>
            </footer>
        </div>
    );
}

export default Home;