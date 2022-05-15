import React from "react";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import './Stylesheets/App.css';
import Home from "./Pages/Home/Home";
import Error404 from "./Pages/Error/Error404";
import Backend from "./Pages/Backend/Backend";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} exact />
                <Route path="/Attendance" element={<Backend />} exact />
                <Route path="/leave" element={<Backend />} exact />
                <Route path="*" element={<Error404 to="/" replace />} />
            </Routes>
        </BrowserRouter>

    );
}

export default App;
