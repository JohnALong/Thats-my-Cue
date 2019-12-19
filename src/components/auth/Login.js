import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import { allUpperCase } from '../../modules/helpers'
import { Form, Button, Image, Row } from 'react-bootstrap'
import './Login.css'

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
        /*
            For now, just store the email and password that
            the customer enters into local storage.
        */
        this.searchUsers()
        this.props.setUser({ name: this.state.name, password: this.state.password })
        this.props.history.push("/home");

    }

    render() {
        return (
            <div classname="loginContainer">
                <Row className="loginTopRow">
                    <Form onSubmit={this.handleLogin}>
                        <h3>Please sign in/Register</h3>
                        <Form.Group>
                            <Form.Control onChange={this.handleFieldChange} type="text"
                                id="name"
                                placeholder="User Name"
                                required="" autoFocus="" />
                            <Form.Label htmlFor="inputName">User Name</Form.Label>
                            <Form.Control onChange={this.handleFieldChange} type="password"
                                id="password"
                                placeholder="Password"
                                required="" autoFocus="" />
                            <Form.Label htmlFor="inputPassword">Password</Form.Label>
                        </Form.Group>
                        <Button type="submit" onClick={this.handleLogin}>Sign in</Button>
                    </Form>
                    <Image id="loginImage1" circle src={require
                        ('../cue_images/loginPhoto2.jpg')} style={{ maxHeight: 'auto' }} />
                </Row>
                <Row className="loginBottomRow">
                    <Image id="loginImage2" circle src={require
                        ('../cue_images/loginPhoto1.jpg')} style={{ maxHeight: 'auto' }} />
                </Row>
            </div>
        )
    }

}

export default Login