import { Routes, Route } from "react-router-dom";
import { Register } from "./Register";
import { Splash } from "./Splash";
import Search from './search/Search'; // Import the Search component
import Login from "./Login";

export const Paths = () => {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/splash" element={<Splash />} />
            <Route path="/search/:name" element={<Search />} /> {/* Add this line */}
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}
