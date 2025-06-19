import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Library from "./Library";
import BookPage from './BookPage'
import TypeTrainer from "./TypeTrainer";


const App = () => {
    return (
        <div className="bg-purple-900 min-h-screen text-yellow-100 font-mono">
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="library" element={<Library />} />
                    <Route path="/book/:id" element={<BookPage />} />
                    <Route path="/typeTrainer" element={<TypeTrainer />} />



                </Routes>
            </Router>
        </div>
    );
};

export default App;
