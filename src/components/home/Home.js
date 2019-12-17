import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Jumbotron, Image, Button } from 'react-bootstrap'

class Home extends Component {
    render() {
        return (
            <>
                <Jumbotron>
                    <div className="image_holder">
                        <Image className="card_images" rounded variant="top" src={require(`../cue_images/default_cues.jpg`)} alt="cue" style={{ maxHeight: 'auto' }} /></div>
                    <h3>Are You Looking <br/> 
                    For a New Cue?</h3>
                    <Link to={`/cues`}><Button variant="success">Yes I Am!</Button></Link>
                    <Link to={`/randomCue`}><Button variant="warning">Lucky Cue</ Button></Link>
                </Jumbotron>
            </>
        )
    }
}

export default Home