import React, { Component } from 'react';
import APIManager from '../../modules/APIManager';
import { Button, Image } from 'react-bootstrap';
import "./CueDetail.css"

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
            <div className="details_view">
                <div className="image_holder">
                    <Image className="card_images" rounded variant="top" src={require(`../cue_images/${this.state.image}`)} alt="cue" style={{ maxHeight: 'auto' }} /></div>
                <div className="details_info">
                    <p>Style: {this.state.styleName}</p>
                    <p>Builder: {this.state.builderName}</p>
                    <p>About: {this.state.aboutCue}</p>
                    <div className="detailsButtons">
                        <Button variant="danger" disabled={this.state.loadingStatus}
                            onClick={this.handleSaveCue} type="submit">
                            Save
                        </Button>
                        <Button variant="info" type="submit" onClick={this.handleReturnToCues} >
                            Back to Cues
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CueDetail;