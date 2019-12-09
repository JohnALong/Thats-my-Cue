import React, { Component } from 'react';
import { Link } from "react-router-dom"

class CueCard extends Component {
  render() {
    return (
      <div>
        <div>
          <img src={require(`../cue_images/${this.props.cue.image}`)} alt="cue" />
          <h3>Name: <span>{this.props.cue.builder.name}</span></h3>
          <p>Style: {this.props.cue.style.name}</p>
          <Link to={`/cues/${this.props.cue.id}`}><button>Details</button></Link>
        </div>
      </div>
    );
  }
}

export default CueCard;