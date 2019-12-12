import React, { Component } from 'react';
import APIManager from '../../modules/APIManager';

class CueDetail extends Component {

    state = {
        image: "default_cues.jpg",
        builderName: "",
        styleName: "",
        aboutCue: ""
    }

    handleReturnToCues = () => {
        this.props.history.push("/cues")
    }

    handleSaveCue = () => {

    }

    componentDidMount() {
        APIManager.get(this.props.cueId)
            .then((cue) => {
                this.setState({
                    image: cue.image,
                    builderName: cue.builder.name,
                    styleName: cue.style.name,
                    aboutCue: cue.aboutCue
                });
            });
    }

    render() {
        return (
            <div className="card">
                <div className="card-content">
                    <img src={require(`../cue_images/${this.state.image}`)} alt="cue" />
                    <h3>Name: <span>{this.state.styleName}</span></h3>
                    <p>Builder: {this.state.builderName}</p>
                    <p>Details: {this.state.aboutCue}</p>
                </div>
                <div className="detailsButtons">
                    <button type="submit">
                        Save
            </button>
                    <button type="submit" onClick={this.handleReturnToCues} >
                        Back to Cues
            </button>
                </div>
            </div>
        );
    }
}

export default CueDetail;