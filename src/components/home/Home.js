import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Jumbotron, Image, Button, Tooltip, OverlayTrigger } from 'react-bootstrap'

class Home extends Component {
    handleRandom = () => {
        this.props.history.push("/randomCue")
    }
    handleToolTip = (props) => {
        return <Tooltip {...props}>Feeling Lucky?</Tooltip>
    }
    render() {
        return (
            <>
                <Jumbotron>
                    <div className="image_holder">
                        <Image className="card_images" rounded variant="top" src={require(`../cue_images/default_cues.jpg`)} alt="cue" style={{ maxHeight: 'auto' }} /></div>
                    <h3>Are You Looking <br />
                        For a New Cue?</h3>
                    <Link to={`/cues`}><Button variant="success">Yes I Am!</Button></Link>
                    <OverlayTrigger placement="right" overlay={this.handleToolTip} className="randomImageHolder">
                            <Image roundedCircle src={require
                                ('../cue_images/smallEightBall.png')} style={{ maxHeight: 'auto' }} onClick={this.handleRandom} />
                    </OverlayTrigger>
                </Jumbotron>
            </>
        )
    }
}

export default Home