import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Emoji from "../Emoji/Emoji";

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
    // TODO: flesh out the links in ternary below and for Random Movie
    //       maybe get rid of the pipes too and let css do the styling

    handleLogoutClick = () => {
        this.props.handleLogout();
        this.toggleNavbar();
    }

    render() {
        return (
            <Navbar color="faded" light>
                <NavbarBrand href="/" className="mr-auto">
                    <h1>
                        <Emoji symbol="🎥" label="camera"/>&nbsp;
                        ReelTalk&nbsp;
                        <Emoji symbol="🎬" label="clapper"/>&nbsp;
                        <Emoji symbol="🎞️" label="reel"/>&nbsp;
                        <Emoji symbol="🍿" label="popcorn"/>
                    </h1>
                </NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <Collapse isOpen={!this.state.collapsed} navbar>
                    <Nav navbar>
                        <NavItem>
                            <Link to="/" onClick={this.toggleNavbar}>Home</Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/movies" onClick={this.toggleNavbar}>Chatrooms</Link>
                        </NavItem>
                        {(this.props.user) ?
                        <NavItem>
                            <Link to="/rooms" onClick={this.toggleNavbar}>Your Rooms</Link>
                        </NavItem>
                            :
                        <span></span>
                        }
                        {this.props.user ?
                            <span>
                                <NavItem>
                                    <Link to="" onClick={this.handleLogoutClick}>Log Out</Link>
                                </NavItem>
                            </span>
                            :
                            <span>
                                <NavItem>
                                    <Link to="/login" onClick={this.toggleNavbar}>Log In</Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="/signup" onClick={this.toggleNavbar}>Sign Up</Link>
                                </NavItem>
                            </span>
                        }
                    </Nav>
                </Collapse>
            </Navbar>

        );
    }
}

export default NavBar;