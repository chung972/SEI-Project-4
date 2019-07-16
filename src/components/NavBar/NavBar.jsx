import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = (props) => {
    // TODO: flesh out the links in ternary below and for Random Movie
    //       maybe get rid of the pipes too and let css do the styling
    let nav = props.user ?
        <span>
            <Link to="" onClick={props.handleLogout}>Log Out</Link>
        </span>
        :
        <span>
            <Link to="/login">Log In</Link>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <Link to="/signup">Sign Up</Link>
        </span>

    return (
        <div>
            <Link to="/">Home</Link>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <Link to="/movies">Chatrooms</Link>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            {nav}
        </div>
    );
};

export default NavBar;