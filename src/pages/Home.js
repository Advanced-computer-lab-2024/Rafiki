import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>Welcome to Rafiki!</h1>
            <p>Wander with aim</p>
            <h2>Choose your path:</h2>
            <div style={{ margin: '20px 0' }}>
                <Link to="/tourist-signup" style={{ marginRight: '20px', fontSize: '20px', textDecoration: 'underline' }}>
                    Register as a Tourist
                </Link>
                <Link to="/guide-signup" style={{ fontSize: '20px', textDecoration: 'underline' }}>
                    Register as a Tour Guide/ Advirtiser / Seller
                </Link>
            </div>
        </div>
    );
};

export default Home;
