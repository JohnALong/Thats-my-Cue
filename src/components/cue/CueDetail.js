import React, { Component } from 'react';
import APIManager from '../../modules/APIManager';

class CueDetail extends Component {

    state = {
        image: "default_cues.jpg",
        builderName: "",
        styleName: ""
    }

    componentDidMount() {
        console.log("CueDetail: ComponentDidMount", this.props);
        APIManager.get(this.props.cueId)
            .then((cue) => {
                this.setState({
                    image: cue.image,
                    builderName: cue.builder.name,
                    styleName: cue.style.name
                });
            });
    }

    render() {
        console.log("detail render", this.state)
        console.log("props render", this.props)
        return (
            <div className="card">
                <div className="card-content">
                <img src={require(`../cue_images/${this.state.image}`)} alt="cue" />
                    <h3>Name: <span>{this.state.styleName}</span></h3>
                    <p>Breed: {this.state.builderName}</p>
                </div>
            </div>
        );
    }
}

export default CueDetail;