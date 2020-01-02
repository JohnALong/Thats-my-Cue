import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { Button, Card, Image } from 'react-bootstrap';
import "./CueCard.css"

class CueCard extends Component {

  render() {
    // console.log("card props", this.props)
    return (
      <Card className="cue_cardbox" style={{ width: '24rem', height: 'auto' }}>
        <Card.Body className="cue_cardbody">
          <Card.Title>Builder: <span>{this.props.cue.builder.name}</span></Card.Title>
          <Card.Title>Style: {this.props.cue.style.name}</Card.Title>

          <Link to={`/cues/${this.props.cue.id}`}>
            <div className="flipBtnWrapper">
              <div className="flipBtn">
                <div className="flipBtn_face flipBtn_back"></div>
                <div className="flipBtn_face flipBtn_mid"></div>
                <div className="flipBtn_face flipBtn_front"></div>
              </div>
            </div>
          </Link>
          <h5>Details</h5>
        </Card.Body>
        <div className="cue_image_holder">
          <Image className="cue_card_images" rounded variant="top" src={require(`../cue_images/${this.props.cue.image}`)} alt="cue" style={{ maxHeight: 'auto' }} /></div>
      </Card>

    );
  }
}

export default CueCard;

{/* <Button variant="info" size="lg" block>Details</Button> */ }