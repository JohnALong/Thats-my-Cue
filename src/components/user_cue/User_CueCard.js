import React, { Component } from 'react';
import APIManager from '../../modules/APIManager'
import { Link } from "react-router-dom"
import { Container, Row, Col, Button, Card, Image } from 'react-bootstrap';
import "../cue/CueCard.css"


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
            <Container>
                <Row>
                    <Col sm className="card_container">
                        <Card className="cardbox" style={{ width: '24 rem', height: 'auto' }}>
                            <div className="image_holder">
                                <Image className="card_images" rounded variant="top" src={require(`../cue_images/${this.state.image}`)} alt="cue" style={{ maxHeight: 'auto' }} /></div>
                            <Card.Body>
                                <Card.Title>Builders Name: {this.state.builderName} </Card.Title>
                                <Card.Body>Style & wraCard.Body info</Card.Body>
                                <Card.Body>info about this cue: {this.props.user_Cue.cue.aboutCue}</Card.Body>
                                <div className="detailsButtons">
                                    <Link to={`/user_Cues/${this.props.user_Cue.id}`}><Button variant="info">Details</Button></Link>
                                    <Link to={`/cues/`}><Button variant="primary">Back to all Cues</Button></Link></div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default User_CueCard;
