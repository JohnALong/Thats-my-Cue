import React, { Component } from 'react';
import { Link } from "react-router-dom"
import NavBarBS from 'react-bootstrap/NavBar'

class NavBar extends Component {

    render() {
        return (
            <NavBarBS bg="dark" sticky="top" className="navbar bg-dark text-white flex-md-nowrap p-0 shadow">
                <span><ul className="nav nav-pills nav-fill">
                    <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                    {(this.props.user) ?
                        <>
                            <li className="nav-item"><Link className="nav-link" to="/cues">Cues</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/user_cues">My Cues</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/login" onClick={this.props.clearUser} >Log Out</Link></li>
                        </>
                        :
                        <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                    }
                </ul></span>
            </NavBarBS>
        )
    }
}

export default NavBar;