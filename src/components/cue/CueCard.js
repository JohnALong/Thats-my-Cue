import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { Container, Row, Col, Button, Image } from 'react-bootstrap';

class CueCard extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col sm>
            <Image src={require(`../cue_images/${this.props.cue.image}`)} alt="cue" fluid />
            <h3>Name: <span>{this.props.cue.builder.name}</span></h3>
            <p>Style: {this.props.cue.style.name}</p>
            <Link to={`/cues/${this.props.cue.id}`}><Button variant="info">Details</Button></Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CueCard;