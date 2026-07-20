import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const api = "https://tourism-backend-x2h9.onrender.com/api/users";

function Signup({ setCurrentUser }) {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await axios.post(`${api}/signup`, { name, email, password });

            
            const loginResponse = await axios.post(`${api}/login`, { email, password }, { withCredentials: true });
            setCurrentUser(loginResponse.data);
            navigate("/");

        } catch (err) {
            setError("Signup failed. Email may already be in use.");
        }
    }

    let errorMessage = null;
    if (error) {
        errorMessage = <p className="error">{error}</p>;
    }

    return (
        <div className="form-page">
            <h2>Create an Account</h2>

            {errorMessage}

            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                <button type="submit">Sign Up</button>
            </form>

            <p className="switch-auth">
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
}

export default Signup;