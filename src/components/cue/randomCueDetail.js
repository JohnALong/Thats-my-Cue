import React, { Component } from 'react'
import APIManager from '../../modules/APIManager';
import { Button, Image, Modal, Jumbotron, Card } from 'react-bootstrap';
import "./CueDetail.css"

class RandomCueDetail extends Component {

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

    handleClose = () => {
        this.setState({ show: false })
    }

    handleShow = () => {
        this.setState({ show: true })
    }

    handleReturnToCues = () => {
        this.props.history.push("/cues")
    }

    handleReRoute = () => {
        this.props.history.push("/user_Cues")
    }

    handleGetCueData = () => {
        console.log("1 in random", this.currentUser)
        APIManager.getWithItems("users", this.currentUser.id, "user_cues")
            .then((user_Cues) => {
                console.log("2 in random")
                return user_Cues
            })
            .then((user_Cues) => {
                console.log("3 in random")
                const result = user_Cues.filter(user_Cue => user_Cue.cueId === this.props.id)
                if (result.length > 0) {
                    console.log("4 in random")
                    this.handleReRoute()
                } else {
                    console.log("5 in random", this.props)
                    this.setState({ loadingStatus: true });
                    const newCue = {
                        cueId: this.state.id,
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

    handleGetAndRandomizeCue = () => {
        APIManager.getAll(`cues/?_expand=builder&_expand=wrap&_expand=style`)
            .then((cues) => {
                console.log("cues in randomizer", cues)
                const randomId = Math.floor(Math.random() * (cues.length - 1));
                console.log("randomId", randomId)
                console.log("random cue", cues[randomId])
                this.setState({
                    image: cues[randomId].image,
                    builderName: cues[randomId].builder.name,
                    contactInfo: cues[randomId].builder.contactInfo,
                    styleName: cues[randomId].style.name,
                    aboutStyle: cues[randomId].style.aboutStyle,
                    aboutWrap: cues[randomId].wrap.aboutWrap,
                    aboutCue: cues[randomId].aboutCue,
                    id: cues[randomId].id,
                    loadingStatus: false,
                });
            })
    }

    componentDidMount() {
        this.handleGetAndRandomizeCue()

    }

    render() {
        console.log("render", this.state.id)
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
                        <Button variant="info" type="submit" onClick={this.handleReturnToCues} >
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

export default RandomCueDetail