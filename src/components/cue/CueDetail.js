import React, { Component } from 'react';
import APIManager from '../../modules/APIManager';
import { Button, Image, Modal, Jumbotron, Card } from 'react-bootstrap';
import "./CueDetail.css"


class CueDetail extends Component {
    currentUser = JSON.parse(localStorage.getItem("credentials"))

    state = {
        image: "default_cues.jpg",
        builderName: "",
        contactInfo: "",
        styleName: "",
        aboutStyle: "",
        aboutWrap: "",
        aboutCue: "",
        loadingStatus: false,
        cueId: "",
        show: false
    }

    // modal controls
    handleClose = () => {
        this.setState({ show: false });
    }

    handleShow = () => {
        this.setState({ show: true });
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
                    contactInfo: cue.builder.contactInfo,
                    styleName: cue.style.name,
                    aboutStyle: cue.style.aboutStyle,
                    aboutWrap: cue.wrap.aboutWrap,
                    aboutCue: cue.aboutCue,
                    id: cue.id,
                    loadingStatus: false,
                });
            });
    }

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
        console.log("details state", this.state)
        console.log("details props", this.props)
        return (
            <Jumbotron className="details_view">
                <Card className="details_info">
                    <Card.Body>Style: <span>{this.state.styleName}</span></Card.Body>
                    <Card.Body>Builder: {this.state.builderName}</Card.Body>
                    <Card.Body>Details: {this.state.aboutCue}</Card.Body>
                    <div className="detailsButtons">
                        <Button variant="primary" disabled={this.state.loadingStatus}
                            onClick={this.handleGetCueData} type="submit">
                            Save</Button>
                        <Button varian="info" type="submit" onClick={this.handleReturnToCues} >
                            Back to Cues</Button>
                    </div>
                </Card>
                <div className="details_image_holder">
                    <Button variant="primary" onClick={this.handleShow} block>About Cue</Button>
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>About this cue</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{this.state.aboutStyle}</Modal.Body>
                        <Modal.Body>{this.state.aboutWrap}</Modal.Body>
                        <Modal.Body>{this.state.builderName}: {this.state.contactInfo}</Modal.Body>
                        <Modal.Footer><Button variant="secondary" onClick={this.handleClose}>close</Button>
                        </Modal.Footer>
                    </Modal>
                    <Image className="details_card_images" rounded variant="top" src={require(`../cue_images/${this.state.image}`)} alt="cue" style={{ maxHeight: 'auto' }} /></div>
            </Jumbotron>
        );
    }
}

export default CueDetail;