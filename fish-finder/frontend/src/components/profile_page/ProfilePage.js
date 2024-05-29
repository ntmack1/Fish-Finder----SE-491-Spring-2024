import React from 'react';
import Header from "../header/Header";

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            bio: 'Software Developer at XYZ Company'
        };
    }

    render() {
        return (
            <div>
                <Header/>
                <h1>{this.state.name}</h1>
                <p>Email: {this.state.email}</p>
                <p>Bio: {this.state.bio}</p>
            </div>
        );
    }
}

export default ProfilePage;
