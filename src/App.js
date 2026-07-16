import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import Home from "./pages/Home";
import PlaceDetails from "./pages/PlaceDetails";
import Admin from "./pages/Admin";
import AddPlace from "./pages/AddPlace";
import EditPlace from "./pages/EditPlace";

function App() {
  const [selectedState, setSelectedState] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  return (
    <Router>
    <Navbar onStateSelect={setSelectedState} resetHome={() => {setSelectedState(""); setSearchResults([]);}}/>      
      <SearchBar onSearch={setSearchResults} selectedState={selectedState}/>    
    <Routes>
        <Route path="/" element={<Home selectedState={selectedState} setSelectedState={setSelectedState} searchResults={searchResults} />} />        
        <Route path="/place/:id" element={<PlaceDetails />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/add" element={<AddPlace />} />
        <Route path="/admin/edit/:id" element={<EditPlace />} />
      </Routes>
    </Router>
  );
}

export default App;