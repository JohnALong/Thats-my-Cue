import React, { Component } from 'react'
import { Link } from "react-router-dom"

class Home extends Component {
    render() {
        return (
            <>
                <h1>That's my cue!!!</h1>
                <img src={require(`../cue_images/default_cues.jpg`)} alt="cue" />
                <h3>Would you like a new cue?</h3>
                <Link to={`/cues`}><button>Yes I Would!</button></Link>
            </>
        )
    }
}

export default Home