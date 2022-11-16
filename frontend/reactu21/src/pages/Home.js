import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
    return (
        <nav className="nav">
            <Link className="nav-link" to={"/login"}>Login</Link>
            <Link className="nav-link" to={"/register"}>Register</Link>
        </nav>
    );

};

export default Home;