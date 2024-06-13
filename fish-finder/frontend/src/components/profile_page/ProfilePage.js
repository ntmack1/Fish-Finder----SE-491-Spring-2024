import React, { useState, useEffect, useContext } from 'react';
import Header from "../header/Header";
import { jwtDecode } from 'jwt-decode'; // Correct named import
import AuthContext from '../../context/AuthProvider';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ProfilePage.css'; // Import CSS for styling
import '../home_page/HomePage.css'

const ProfilePage = () => {
    const { auth, logout } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [savedFish, setSavedFish] = useState([]);

    useEffect(() => {
        if (auth.accessToken) {
            decodeToken(auth.accessToken);
            fetchSavedFish(auth.userId);
        }
    }, [auth]);

    const decodeToken = (token) => {
        if (token) {
            const decoded = jwtDecode(token); // Correct usage
            setName(decoded.sub);
        }
    }

    const fetchSavedFish = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/checklist/getFishByUser/${userId}`);
            setSavedFish(response.data);
        } catch (error) {
            console.error('Failed to fetch saved fish:', error);
        }
    }

    const handleLogout = () => {
        logout();
        window.location.reload();
    }

    return (
        <div className='hero'>
            <div className="ProfilePage">
                <Header />
                {auth.accessToken ? (
                    <>
                        <h1>{name}</h1>
                        <div className="logout-button-container">
                            <button className="logout-button" onClick={handleLogout}>Logout</button>
                        </div>
                        {savedFish.length > 0 ? (
                            <div className="saved-fish-container">
                                <table className="saved-fish-table">
                                    <thead>
                                    <tr>
                                        <th>Fish Name</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {savedFish.map(fish => (
                                        <tr key={fish.id}>
                                            <td>
                                                <Link to={`/search/${fish.fishName}`}>{fish.fishName}</Link>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p>No saved fish</p>
                        )}
                    </>
                ) : (
                    <h1><Link to="/login">Please log in</Link></h1>
                )}
            </div>
        </div>
    );
}

export default ProfilePage;


