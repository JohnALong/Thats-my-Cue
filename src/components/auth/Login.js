import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import {allUpperCase} from '../../modules/helpers'

class Login extends Component {

    // Set initial state
    state = {
        name: "",
        password: "",
        loadingStatus: false,
    }

    // Update state whenever an input field is edited
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }
// fetch call to loop through users end point and compare name to person logging in and set local storage for user
    searchUsers = (e) => {
        APIManager.searchUser(this.state.name)
            .then((existingUser) => {
                if (existingUser.length > 0) {
                    { window.alert("Welcome back!") }
                    { this.props.setUser(existingUser[0]) }
                    { this.props.history.push("/") }
                } else {
                    { window.alert("Welcome!") }
                    this.setState({ loadingStatus: true })
                    const user = {
                        name: allUpperCase(this.state.name),
                        password: this.state.password
                    }
                    APIManager.post("users", user)
                        .then(newUser => {
                            this.props.setUser(newUser)
                            this.props.history.push("/")
                        })
                }
            })
    }

    handleLogin = (e) => {
        e.preventDefault()
        this.searchUsers()
        this.props.setUser({ name: this.state.name, password: this.state.password })
        this.props.history.push("/home");

    }

    render() {
        return (
            <form onSubmit={this.handleLogin}>
                <fieldset>
                    <h3>Please sign in</h3>
                    <div>
                        <input onChange={this.handleFieldChange} type="text"
                            id="name"
                            placeholder="Full Name"
                            required="" autoFocus="" />
                        <label htmlFor="inputName">Full Name</label>
                        <input onChange={this.handleFieldChange} type="password"
                            id="password"
                            placeholder="Password"
                            required="" autoFocus="" />
                        <label htmlFor="inputPassword">Password</label>
                    </div>
                    <button type="submit" onClick={this.handleLogin}>
                        Sign in
            </button>
                </fieldset>
            </form>
        )
    }

}

export default Login