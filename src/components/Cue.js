import React, { Component } from 'react'
import NavBar from './nav/NavBar'
import ApplicationViews from './ApplicationViews'
import "./Cue.css"

class Cue extends Component {

    state = {
        user: false,
        userId: ""
    }
    
    isAuthenticated = () => localStorage.getItem("credentials") !== null
    
    setUser = authObj => {
        localStorage.setItem(
            "credentials",
            JSON.stringify(authObj)
        )
        this.setState({
            user: this.isAuthenticated(),
        });
        console.log("authObj", authObj)
    }

    getUser = JSON.parse(localStorage.getItem("credentials"))

    clearUser = () => {
        localStorage.removeItem("credentials")

        this.setState({
            user: this.isAuthenticated()
        });
    }

    componentDidMount() {
        this.setState({
            user: this.isAuthenticated()
        })
    }

    render() {
        // console.log("cue.js state", this.getUser)
        return (
            <>
                <NavBar user={this.state.user}
                clearUser={this.clearUser} />
                <ApplicationViews user={this.state.user}
                setUser={this.setUser}
                searchUsers={this.searchUsers}
                getUser={this.getUser} />
            </>

        );
    }
}

export default Cue