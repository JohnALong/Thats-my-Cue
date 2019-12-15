import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { Container, Row, Col, Button, Card, Image } from 'react-bootstrap';
import "./CueCard.css"

class CueCard extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col sm className="card_container">
            <Card className="cardbox" style={{ width: '24rem', height: 'auto' }}>
              <div className="image_holder">
                <Image className="card_images" rounded variant="top" src={require(`../cue_images/${this.props.cue.image}`)} alt="cue" style={{ maxHeight: 'auto' }} /></div>
              <Card.Body>
                <Card.Title>Name: <span>{this.props.cue.builder.name}</span></Card.Title>
                <Card.Body>Style: {this.props.cue.style.name}</Card.Body>
                <Link to={`/cues/${this.props.cue.id}`}><Button variant="info" size="lg" block>Details</Button></Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CueCard;