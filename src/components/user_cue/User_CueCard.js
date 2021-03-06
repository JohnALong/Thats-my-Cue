import React, { Component } from 'react';
import APIManager from '../../modules/APIManager'
import { Link } from "react-router-dom"
import { Button, Card, Image } from 'react-bootstrap';
import "./User_CueCard.css"


class User_CueCard extends Component {

    state = {
        image: "default_cues.jpg",
        builderName: "",
        styleName: ""
    }


    componentDidMount() {
        APIManager.get(this.props.user_Cue.cueId)
            .then((cue) => {
                this.setState({
                    image: cue.image,
                    builderName: cue.builder.name,
                    styleName: cue.style.name
                })
            })
    }

    render() {
        console.log("this.state in card", this.state)
        console.log("this.props in card", this.props)
        return (
                        <Card className="user_cardbox" style={{ width: '24 rem', height: 'auto' }}>
                            <Card.Body className="user_cardbody">
                                <Card.Title>Builders Name: {this.state.builderName} </Card.Title>
                                <Card.Title>Style: {this.state.styleName}</Card.Title>
                                <Card.Text>About this cue: {this.props.user_Cue.cue.aboutCue}</Card.Text>
                                <div className="user_detailsButtons">
                                    <Link to={`/user_Cues/${this.props.user_Cue.id}`}><Button variant="info">Details</Button></Link>
                                    <Link to={`/cues/`}><Button variant="primary">Back to all Cues</Button></Link></div>
                            </Card.Body>
                            <div className="user_image_holder">
                                <Image className="user_card_images" rounded variant="top" src={require(`../cue_images/${this.state.image}`)} alt="cue" style={{ maxHeight: 'auto' }} /></div>
                        </Card>  
        );
    }
}

export default User_CueCard;
