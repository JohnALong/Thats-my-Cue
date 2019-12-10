import React, { Component } from 'react';
import { Link } from "react-router-dom"

class NavBar extends Component {

    render() {
        return (
            <nav>
                <ul className="container">
                    <li><Link className="nav-link" to="/">Home</Link></li>
                    {(this.props.user) ?
                        <>
                            <li><Link className="nav-link" to="/cues">Cues</Link></li>
                            <li><Link className="nav-link" to="/cues">My Cues</Link></li>
                            <li><Link className="nav-link" to="/login" onClick={this.props.clearUser} >Log Out</Link></li>
                        </>
                        :
                        <li><Link className="nav-link" to="/login">Login</Link></li>
                    }
                </ul>
            </nav>
        )
    }
}

export default NavBar;