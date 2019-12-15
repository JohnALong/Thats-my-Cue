import React, { Component } from 'react';
import { Link } from "react-router-dom"
import NavBarBS from 'react-bootstrap/NavBar'
import "bootstrap/dist/css/bootstrap.min.css"


class NavBar extends Component {

    render() {
        return (
            <NavBarBS sticky="top" className="navbar bg-dark flex-md-nowrap p-0 shadow">
                <div className="navbar-brand"><img src={require(`../cue_images/capstone_logo.png`)} width="40" height="30" alt="cue" /></div>
                <span><ul className="nav nav-pills nav-fill nav-justified">
                    <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                    {(this.props.user) ?
                        <>
                            <li className="nav-item"><Link className="nav-link" to="/cues">AllCues</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/user_cues">MyCues</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/login" onClick={this.props.clearUser} >LogOut</Link></li>
                        </>
                        :
                        <li className="nav-item"><Link className="nav-link" to="/login">LogIn</Link></li>
                    }
                </ul></span>
            </NavBarBS>
        )
    }
}

export default NavBar;