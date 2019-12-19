import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { Button, Card, Image } from 'react-bootstrap';
import "./CueCard.css"

class CueCard extends Component {

  render() {
    console.log("card props", this.props)
    return (
      <Card className="cardbox" style={{ width: '24rem', height: 'auto' }}>
        <Card.Body className="cardbody">
          <Card.Title>Builder: <span>{this.props.cue.builder.name}</span></Card.Title>
          <Card.Title>Style: {this.props.cue.style.name}</Card.Title>
          <Link to={`/cues/${this.props.cue.id}`}><Button variant="info" size="lg" block>Details</Button></Link>
        </Card.Body>
        <div className="image_holder">
          <Image className="card_images" rounded variant="top" src={require(`../cue_images/${this.props.cue.image}`)} alt="cue" style={{ maxHeight: 'auto' }} /></div>
      </Card>

    );
  }
}

export default CueCard;