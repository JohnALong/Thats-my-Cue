import React, { Component } from 'react';
import APIManager from '../../modules/APIManager';
import { Container, Row, Col, Button, Card, Image } from 'react-bootstrap';
import "./CueCard.css"


class CueDetail extends Component {
    currentUser = JSON.parse(localStorage.getItem("credentials"))

    state = {
        image: "default_cues.jpg",
        builderName: "",
        styleName: "",
        aboutCue: "",
        loadingStatus: false,
        cueId: ""
    }

    handleReturnToCues = () => {
        this.props.history.push("/cues")
    }

    handleReRoute = () => {
        this.props.history.push("/user_Cues")
    }

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

    handleGetCueData = () => {
        console.log("1")
        APIManager.getWithItems("users", this.currentUser.id, "user_cues")
            .then((user_Cues) => {
                console.log("2")
                return user_Cues
            })
            .then((user_Cues) => {
                console.log("3")
                const result = user_Cues.filter(user_Cue => user_Cue.cueId === this.props.id)
                if (result.length > 0) {
                    console.log("4")
                    this.handleReRoute()
                } else {
                    console.log("5")
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

    // handleSaveCue = () => {
    //     const currentUser = JSON.parse(localStorage.getItem("credentials"))
    //     this.setState({ loadingStatus: true });
    //     const newCue = {
    //         id: this.props.id,
    //         userId: currentUser.id,
    //         notes: "your notes here",
    //         quotedPrice: "$ get from builder",
    //         timeToBuild: "how long to make?",
    //         builderContacted: false
    //     };
    //     APIManager.post("user_cues", newCue)
    //         .then(() => this.props.history.push("/user_Cues"))
    // }

    componentDidMount() {
        this.getThisCue()

    }

    render() {
        console.log("details state", this.state)
        console.log("details props", this.props)
        return (
            <div className="card">
                <div className="card-content">
                    <img src={require(`../cue_images/${this.state.image}`)} alt="cue" />
                    <h3>Name: <span>{this.state.styleName}</span></h3>
                    <p>Builder: {this.state.builderName}</p>
                    <p>Details: {this.state.aboutCue}</p>
                </div>
                <div className="saveToUserCues">
                    <Button variant="primary" disabled={this.state.loadingStatus}
                        onClick={this.handleGetCueData} type="submit">
                        Save
            </Button>
                    <Button varian="info" type="submit" onClick={this.handleReturnToCues} >
                        Back to Cues
            </Button>
                </div>
            </div>
        );
    }
}

export default CueDetail;