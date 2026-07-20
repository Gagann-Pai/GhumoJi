import { useState, useEffect } from "react";
import { Link,Navigate } from "react-router-dom";
import axios from "axios";

const api = "https://tourism-backend-x2h9.onrender.com/api/places";

function Admin({ currentUser }) {
    const [places, setPlaces] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchPlaces();
    }, []);

    async function fetchPlaces() {
        try {
            const response = await axios.get(api);
            setPlaces(response.data);
        } catch (err) {
            setError("Failed to load places");
        }
    }

    async function handleDelete(id) {
        try {
            await axios.delete(`${api}/${id}`);
            fetchPlaces(); 
        } catch (err) {
            setError("Failed to delete place");
        }
    }

    if (!currentUser || currentUser.role !== "admin") {
        return <Navigate to="/" />;
    }

    let errorMessage = null;
    if (error) {
        errorMessage = <p className="error">{error}</p>;
    }

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h2>Admin Dashboard</h2>
                <Link to="/admin/add" className="add-btn">+ Add New Place</Link>
            </div>

            {errorMessage}

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>State</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {places.map((place) => (
                        <tr key={place._id}>
                            <td>
                                <img src={place.image} alt={place.name} className="admin-thumb" />
                            </td>
                            <td>{place.name}</td>
                            <td>{place.state}</td>
                            <td>
                                <Link to={`/admin/edit/${place._id}`} className="edit-btn">Edit</Link>
                                <button onClick={() => handleDelete(place._id)} className="delete-btn">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Admin;