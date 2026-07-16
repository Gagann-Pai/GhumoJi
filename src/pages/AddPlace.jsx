import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const api = "https://tourism-backend-x2h9.onrender.com/api/places";

function AddPlace() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [bestTime, setBestTime] = useState("");
    const [entryFee, setEntryFee] = useState("");
    const [rating, setRating] = useState("");
    const [location, setLocation] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await axios.post(api, {
                name,
                state,
                city,
                image,
                description,
                bestTime,
                entryFee,
                rating,
                location
            });
            navigate("/admin");
        } catch (err) {
            setError("Failed to add place");
        }
    }

    let errorMessage = null;
    if (error) {
        errorMessage = <p className="error">{error}</p>;
    }

    return (
        <div className="form-page">
            <h2>Add Tourist Place</h2>

            {errorMessage}

            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

                <label>State</label>
                <input type="text" value={state} onChange={(e) => setState(e.target.value)} required />

                <label>City</label>
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />

                <label>Image URL</label>
                <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />

                <label>Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>

                <label>Best Time to Visit</label>
                <input type="text" value={bestTime} onChange={(e) => setBestTime(e.target.value)} />

                <label>Entry Fee</label>
                <input type="number" value={entryFee} onChange={(e) => setEntryFee(e.target.value)} />

                <label>Rating</label>
                <input type="number" step="0.1" min="0" max="5" value={rating} onChange={(e) => setRating(e.target.value)} />

                <label>Location</label>
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />

                <button type="submit">Add Place</button>
            </form>
        </div>
    );
}

export default AddPlace;