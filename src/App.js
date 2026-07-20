import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import './App.css';
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import Home from "./pages/Home";
import PlaceDetails from "./pages/PlaceDetails";
import Admin from "./pages/Admin";
import AddPlace from "./pages/AddPlace";
import EditPlace from "./pages/EditPlace";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const userApi = "https://tourism-backend-x2h9.onrender.com/api/users";

function App() {
  const [selectedState, setSelectedState] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function checkSession() {
      try {
        const response = await axios.get(`${userApi}/me`, { withCredentials: true });
        setCurrentUser(response.data);
      } catch (err) {
        setCurrentUser(null);
      }
    }
    checkSession();
  }, []);

  return (
    <Router>
      <Navbar
        onStateSelect={setSelectedState}
        resetHome={() => {setSelectedState(""); setSearchResults(null);}}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      <Routes>
        <Route path="/" element={
          <>
            <SearchBar onSearch={setSearchResults} selectedState={selectedState} />
            <Home 
              selectedState={selectedState} 
              setSelectedState={setSelectedState} 
              searchResults={searchResults} 
              currentUser={currentUser} 
            />
          </>
        } />        
        <Route path="/place/:id" element={<PlaceDetails />} />
        <Route path="/admin" element={<Admin currentUser={currentUser} />} />
        <Route path="/admin/add" element={<AddPlace currentUser={currentUser} />} />
        <Route path="/admin/edit/:id" element={<EditPlace currentUser={currentUser} />} />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path="/signup" element={<Signup setCurrentUser={setCurrentUser} />} />      
      </Routes>
    </Router>
  );
}

export default App;