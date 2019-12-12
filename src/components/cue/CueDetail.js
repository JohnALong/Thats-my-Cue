import React, { Component } from 'react';
import APIManager from '../../modules/APIManager';

class CueDetail extends Component {

    state = {
        image: "default_cues.jpg",
        builderName: "",
        styleName: "",
        aboutCue: "",
        loadingStatus: false
    }

    handleReturnToCues = () => {
        this.props.history.push("/cues")
    }

    handleSaveCue = () => {
        const currentUser = JSON.parse(localStorage.getItem("credentials"))
        this.setState({ loadingStatus: true });
        const newCue = {
            cueId: this.props.cueId,
            userId: currentUser.id,
            notes: "your notes here",
            quotedPrice: "$ get from builder",
            timeToBuild: "how long to make?",
            builderContacted: false
        };
        APIManager.post("user_cues", newCue)
        .then(() => this.props.history.push("/user_Cues"))
    }

    componentDidMount() {
        APIManager.get(this.props.cueId)
            .then((cue) => {
                this.setState({
                    image: cue.image,
                    builderName: cue.builder.name,
                    styleName: cue.style.name,
                    aboutCue: cue.aboutCue,
                    loadingStatus: false,
                });
            });
    }

    render() {
        // console.log("details state", this.state)
        // console.log("details props", this.props)
        return (
            <div className="card">
                <div className="card-content">
                    <img src={require(`../cue_images/${this.state.image}`)} alt="cue" />
                    <h3>Name: <span>{this.state.styleName}</span></h3>
                    <p>Builder: {this.state.builderName}</p>
                    <p>Details: {this.state.aboutCue}</p>
                </div>
                <div className="saveToUserCues">
                    <button disabled={this.state.loadingStatus}
                    onClick={this.handleSaveCue} type="submit">
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