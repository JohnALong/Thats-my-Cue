import React, { Component } from 'react';
import APIManager from '../../modules/APIManager';
import { Button, Image, Modal } from 'react-bootstrap';
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
        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        console.log("details state", this.state)
        console.log("details props", this.props)
        return (
            <div className="details_view">
                <div className="image_holder">
                    <Image className="card_images" rounded variant="top" src={require(`../cue_images/${this.state.image}`)} alt="cue" style={{ maxHeight: 'auto' }} /></div>
                <div className="details_info">
                    <p>Style: <span>{this.state.styleName}</span></p>
                    <Button variant="primary" onClick={handleShow}>About Modal</Button>
                    <Modal show={show} onHide={handleClose} animation={false}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal Heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{this.state.aboutWrap}</Modal.Body>
                        <Modal.Footer><Button variant="secondary" onClick={handleClose}>close</Button>
                        </Modal.Footer>
                    </Modal>
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