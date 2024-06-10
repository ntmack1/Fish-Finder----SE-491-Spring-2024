import React, { useState, useEffect, useContext } from 'react';
import Header from "../header/Header";
import { jwtDecode } from 'jwt-decode'; // Correct named import
import AuthContext from '../../context/AuthProvider';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
        <div>
            <Header />
            {auth.accessToken ? (
                <>
                    <h1>{name}</h1>
                    <button onClick={handleLogout}>Logout</button>
                    {savedFish.length > 0 ? (
                        <table>
                            <thead>
                            <tr>
                                <th>Fish Name</th>
                            </tr>
                            </thead>
                            <tbody>
                            {savedFish.map(fish => (
                                <tr key={fish.id}>
                                    <td>{fish.fishName}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No saved fish</p>
                    )}
                </>
            ) : (
                <h1><Link to="/login">Please log in</Link></h1>
            )}
        </div>
    );
}

export default ProfilePage;

