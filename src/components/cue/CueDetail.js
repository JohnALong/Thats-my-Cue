import React, { Component } from 'react';
import APIManager from '../../modules/APIManager';
import { Button, Card, Image } from 'react-bootstrap';
import "./CueCard.css"

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
        console.log("details state", this.state)
        console.log("details props", this.props)
        return (
            <Card className="cardbox" style={{ width: '24rem', height: 'auto' }}>
                <div className="image_holder">
                    <Image className="card_images" rounded variant="top" src={require(`../cue_images/${this.state.image}`)} alt="cue" style={{ maxHeight: 'auto' }} /></div>
                <Card.Body>
                    <Card.Title>Name: {this.state.styleName}</Card.Title>
                    <Card.Body>Builder: {this.state.builderName}</Card.Body>
                    <Card.Body>Details: {this.state.aboutCue}</Card.Body>
                    <div className="saveToUserCues">
                        <Button variant="primary" disabled={this.state.loadingStatus}
                            onClick={this.handleSaveCue} type="submit">
                            Save
            </Button>
                        <Button varian="info" type="submit" onClick={this.handleReturnToCues} >
                            Back to Cues
            </Button>
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

export default CueDetail;