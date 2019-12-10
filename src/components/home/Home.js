import React, { Component } from 'react'

class Home extends Component {
    render() {
        return (
            <>
                <div>That's my cue!!!</div>
                <img src={require(`../cue_images/default_cues.jpg`)} alt="cue" />
            </>
        )
    }
}

export default Home