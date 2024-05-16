import { Routes, Route } from "react-router-dom"
import { Register } from "./Register"
import { Splash } from "./Splash"

export const Paths = () => {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/splash" element={<Splash />} />
        </Routes>
    )
}
