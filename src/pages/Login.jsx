import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const api = "https://tourism-backend-x2h9.onrender.com/api/users";

function Login({ setCurrentUser }) {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await axios.post(`${api}/login`, { email, password }, { withCredentials: true });
            setCurrentUser(response.data);
            navigate("/");
        } catch (err) {
            setError("Invalid email or password");
        }
    }

    let errorMessage = null;
    if (error) {
        errorMessage = <p className="error">{error}</p>;
    }

    return (
        <div className="form-page">
            <h2>Login</h2>

            {errorMessage}

            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                <button type="submit">Login</button>
            </form>

            <p className="switch-auth">
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
        </div>
    );
}

export default Login;