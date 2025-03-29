import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Browse from "./pages/Browse";
import RecipeCard from "./components/RecipeCard";
import Home from "./pages/Home"; // If you have a Home page
import Navbar from "./components/Navbar"; // If you have a Navbar
import About from "./pages/About"; // Import About Page
import RecipeList from "./pages/RecipeList";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/recipe/:id" element={<RecipeCard />} />
        <Route path="/about" element={<About />} />  
        <Route path="/recipes" element={<RecipeList />} />
      </Routes>
    </Router>
  );
};

export default App;
