import { Routes, Route } from "react-router-dom";
import { Register } from "./Register";
import { Splash } from "./Splash";
import Search from './search/Search';
import Recipe from "./recipe_page/Recipe";
import ProfilePage from "./profile_page/ProfilePage"; // Import the Search component
import Login from "./Login";

export const Paths = () => {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/splash" element={<Splash />} />
            <Route path="/search/:name" element={<Search />} />
            <Route path="/recipe/:id" element={<Recipe />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}
