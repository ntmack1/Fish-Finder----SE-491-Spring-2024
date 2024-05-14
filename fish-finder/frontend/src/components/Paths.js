import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Register } from "./Register"
import { Splash } from "./Splash"
export const Paths = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" Component={Splash} />
                <Route path = "/register" Component={Register} />
            </Routes>
        </Router>
    )
}