import React from 'react';
import Header from "../header/Header";
import { jwtDecode } from 'jwt-decode';
import AuthContext from '../../context/AuthProvider'
import { Link } from 'react-router-dom'; // Import Link from react-router-dom


class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '' // Initialize name as empty
        };
    }

    // Use componentDidMount to decode the token
    componentDidMount() {
        this.context.auth.accessToken && this.decodeToken(this.context.auth.accessToken);
    }

    decodeToken = (token) => {
        if (token) {
            const decoded = jwtDecode(token);
            this.setState({ name: decoded.sub });
        }
    }

    handleLogout = () => {
        this.context.logout();
        window.location.reload();
    }

    render() {
        return (
            <div>
                <Header/>
                {this.context.auth.accessToken ? (
                    <>
                        <h1>{this.state.name}</h1>
                        <button onClick={this.handleLogout}>Logout</button>
                    </>
                ) : (
                    <h1><Link to="/login">Please log in</Link></h1> // Use Link to create a hyperlink
                )}
            </div>
        );
    }
}

ProfilePage.contextType = AuthContext; // Assign AuthContext to contextType

export default ProfilePage;
