import { Routes, Route } from "react-router-dom";
import { Register } from "./Register";
import { Splash } from "./Splash";
import Search from './search/Search';
import Recipe from "./Recipe"; // Import the Search component

export const Paths = () => {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/splash" element={<Splash />} />
            <Route path="/search/:name" element={<Search />} />
            <Route path="/recipe/:id" element={<Recipe />} />
        </Routes>
    );
}
