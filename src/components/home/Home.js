import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Image, Button, Tooltip, OverlayTrigger } from 'react-bootstrap'
import './Home.css'

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
                <div className="homeContent">
                    <h3 className="home_headline">Are You Looking <br />
                        For a New Cue?</h3>
                    <div className="home_image_holder">
                        <Image className="home_card_images" rounded variant="top" src={require(`../cue_images/default_cues.jpg`)} alt="cue" style={{ maxHeight: 'auto' }} /></div>
                    <div className="homeButtons">
                        <div>
                            <Link to={`/cues`}><Button variant="success">Yes I Am!</Button></Link>
                        </div>
                        <OverlayTrigger placement="auto" overlay={this.handleToolTip} className="randomImageHolder">
                            <Image roundedCircle src={require
                                ('../cue_images/smallEightBall.png')} style={{ maxHeight: 'auto' }} onClick={this.handleRandom} />
                        </OverlayTrigger>
                    </div>
                </div>
            </>
        )
    }
}

export default Home