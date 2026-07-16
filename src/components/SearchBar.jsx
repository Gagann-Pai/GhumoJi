import React from "react";
import { useState } from "react";
import axios from "axios";
import '../App.css';

function SearchBar({ onSearch }) {
    const [placeName, setPlaceName] = useState("");
    const [error, setError] = useState("");

    async function searchPlaces() {
  try {
    const response = await axios.get(`https://tourism-backend-x2h9.onrender.com/api/places/search?name=${placeName.trim()}`);
    onSearch(response.data);
  }
  catch (err) {
    console.log(err);
    setError("Place not found");
  }
}

    return (
        <div className="searchBox">
            <input 
                type="text" 
                placeholder="type the name of place" 
                value={placeName} 
                onChange={(e) => setPlaceName(e.target.value)}
            />
            <button onClick={searchPlaces}>Search</button>

            {error && (
                <div className="error">
                    {error}
                </div>
            )}
        </div>
    );
}

export default SearchBar;