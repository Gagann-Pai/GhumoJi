import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const api = "https://tourism-backend-x2h9.onrender.com/api/places";

function PlaceDetails() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchPlace() {
            try {
                const response = await axios.get(`${api}/${id}`);
                setPlace(response.data);
            } catch (err) {
                setError("Place not found");
            }
        }
        fetchPlace();
    }, [id]);

    if (error) {
        return <p className="error">{error}</p>;
    }

    if (!place) {
        return <p>Loading...</p>;
    }

    return (
        <div className="place-details">
            <img src={place.image} alt={place.name} />
            <h1>{place.name}</h1>
            <p>{place.city}, {place.state}</p>
            <p>{place.description}</p>
            <p>Best Time to Visit: {place.bestTime}</p>
            <p>Entry Fee: ₹{place.entryFee}</p>
            <p>Rating: ⭐ {place.rating}</p>
        </div>
    );
}

export default PlaceDetails;