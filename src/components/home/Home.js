import React, { Component } from 'react'
import { Image, Tooltip, OverlayTrigger } from 'react-bootstrap'
import './Home.css'

class Home extends Component {

    handleAllCues = () => {
        this.props.history.push("/cues")
    }

    handleRandom = () => {
        this.props.history.push("/randomCue")
    }
    handleToolTip = (props) => {
        return <Tooltip {...props}>Feeling Lucky?</Tooltip>
    }
    render() {
        console.log("props in home", this.props)
        return (
            <>
                <div className="homeContent">
                    <h3 className="home_headline">Are You Looking <br />
                        For a New Cue?</h3>
                    <div className="home_image_holder">
                        <Image className="home_card_images" rounded variant="top" src={require(`../cue_images/homePageImage.jpeg`)} alt="cue" style={{ maxHeight: 'auto' }} /></div>
                    <div className="homeButtons">
                        <div onClick={this.handleAllCues} className="flipBtnWrapper">
                            <div className="flipBtn">
                                <div className="flipBtn_face flipBtn_back"></div>
                                <div className="flipBtn_face flipBtn_mid"></div>
                                <div className="flipBtn_face flipBtn_front"></div>
                            </div>
                        </div>
                        <OverlayTrigger className="randomHolder randomImageHolder" trigger={['hover']} placement="auto" overlay={this.handleToolTip}>
                            <Image roundedCircle src={require
                                ('../cue_images/8-ball_Julian.png')} style={{ maxHeight: '100px' }} onClick={this.handleRandom} />
                        </OverlayTrigger>
                    </div>
                </div>
            </>
        )
    }
}


export default Home