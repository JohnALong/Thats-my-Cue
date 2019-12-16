import React, { Component } from 'react';
import APIManager from '../../modules/APIManager';
import { Button, Image } from 'react-bootstrap';
import "./CueDetail.css"


class CueDetail extends Component {
    // variable to hold current user info to avoid being able to save same cue twice
    currentUser = JSON.parse(localStorage.getItem("credentials"))

    state = {
        image: "default_cues.jpg",
        builderName: "",
        styleName: "",
        aboutCue: "",
        loadingStatus: false,
        cueId: ""
    }
// function call to support button to return to all cues view
    handleReturnToCues = () => {
        this.props.history.push("/cues")
    }
// function call to handle what happens if user selects cue already saved to their profile
    handleReRoute = () => {
        this.props.history.push("/user_Cues")
    }
// function call to get details of selected cue for viewing
    getThisCue = () => {
        APIManager.get(this.props.id)
            .then((cue) => {
                this.setState({
                    image: cue.image,
                    builderName: cue.builder.name,
                    styleName: cue.style.name,
                    aboutCue: cue.aboutCue,
                    id: cue.id,
                    loadingStatus: false,
                });
            });
    }
// function call to either route to users cues or post new cue to user profile and then route to users cues
    handleGetCueData = () => {
        APIManager.getWithItems("users", this.currentUser.id, "user_cues")
            .then((user_Cues) => {
                return user_Cues
            })
            .then((user_Cues) => {
                const result = user_Cues.filter(user_Cue => user_Cue.cueId === this.props.id)
                if (result.length > 0) {
                    this.handleReRoute()
                } else {
                    this.setState({ loadingStatus: true });
                    const newCue = {
                        cueId: this.props.id,
                        userId: this.currentUser.id,
                        notes: "your notes here",
                        quotedPrice: "$ get from builder",
                        timeToBuild: "how long to make?",
                        builderContacted: false
                    };
                    APIManager.post("user_cues", newCue)
                        .then(() => this.props.history.push("/user_Cues"))
                }
            })
    }

    componentDidMount() {
        this.getThisCue()

    }

    render() {
        // console.log("details state", this.state)
        // console.log("details props", this.props)
        return (
            <div className="details_view">
                <div className="image_holder">
                    <Image className="card_images" rounded variant="top" src={require(`../cue_images/${this.state.image}`)} alt="cue" style={{ maxHeight: 'auto' }} /></div>
                <div className="details_info">
                    <p>Style: <span>{this.state.styleName}</span></p>
                    <p>Builder: {this.state.builderName}</p>
                    <p>Details: {this.state.aboutCue}</p>
                    <div className="detailsButtons">
                        <Button variant="primary" disabled={this.state.loadingStatus}
                            onClick={this.handleGetCueData} type="submit">
                            Save
            </Button>
                        <Button varian="info" type="submit" onClick={this.handleReturnToCues} >
                            Back to Cues
            </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CueDetail;