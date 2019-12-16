import React, { Component } from 'react'
import APIManager from '../../modules/APIManager'
import { Form, Row, Col, Button, Image } from 'react-bootstrap'
import './User_CueEdit.css'

class User_CueEdit extends Component {
    state = {
        image: "default_cues.jpg",
        builderName: "",
        wrapName: "",
        styleName: "",
        aboutCue: "",
        notes: "",
        quotedPrice: "",
        builderContacted: false,
        timeToBuild: "",
        userCueId: "",
        loadingStatus: true
    }

    // function to get all relevant data about this cue from cues end point
    getThisUsersCueDetails = (cueId) => {
        return APIManager.get(cueId)
            .then((user_cue_info) => {
                return user_cue_info

            })
    }

    // function call to get base data about this users cue from user cues end point and then call to end point from cues to get remaining info necessary
    getThisUsersCue = () => {
        console.log("get this cue fetch", this.props.id)
        return APIManager.getSingleUserCue(this.props.id)
            .then((user_cue) => {
                return user_cue
            })
            .then((user_cue) => {
                this.getThisUsersCueDetails(user_cue.cueId)
                    .then((user_cue_info) => {
                        this.setState({
                            image: user_cue_info.image,
                            builderName: user_cue_info.builder.name,
                            wrapName: user_cue_info.wrap.name,
                            styleName: user_cue_info.style.name,
                            aboutCue: user_cue_info.aboutCue,
                            notes: user_cue.notes,
                            quotedPrice: user_cue.quotedPrice,
                            builderContacted: user_cue.builderContacted,
                            timeToBuild: user_cue.timeToBuild,
                            userCueId: user_cue.cueId,
                            loadingStatus: false
                        })
                        console.log("user_cue_info and user_cue line 51", user_cue_info, user_cue)
                    })
            })
    }

    // function to handle routing back to user_cues
    handleReturnToCues = () => {
        this.props.history.push("/user_Cues")
    }
    // function to handle deleting selected cue
    handleDeleteCue = () => {
        APIManager.delete("user_cues", this.props.id)
            .then(() => {
                this.props.history.push("/user_Cues")
            })
    }

    // function to control which portions can be updated
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    // to handle checkbox true/false
    handleCheckBox = evt => {
        this.setState({ builderContacted: !this.state.builderContacted })
    }

    // function to edit this cue
    updateUser_Cue = evt => {
        evt.preventDefault()
        this.setState({ loadingStatus: true })
        const editedUser_Cue = {
            id: this.props.match.params.id,
            notes: this.state.notes,
            quotedPrice: this.state.quotedPrice,
            builderContacted: this.state.builderContacted,
            timeToBuild: this.state.timeToBuild,
        }
        APIManager.updateSelectedSection("user_cues", editedUser_Cue)
            .then(() => this.props.history.push("/user_Cues"))
    }

    componentDidMount() {
        this.getThisUsersCue()
    }

    render() {
        console.log("edit props", this.props)
        console.log("edit state", this.state)
        return (
            <div className="allEditView">
                <h1 className="heading">Your Notes</h1>
                <Form className="form">
                    <Form.Group>
                        <Form.Label>Update your notes</Form.Label>
                        <Form.Control as="textarea" rows="4" required
                            onChange={this.handleFieldChange}
                            id="notes" value={this.state.notes} />
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group>
                                <input type="text" required
                                    onChange={this.handleFieldChange}
                                    id="quotedPrice" value={this.state.quotedPrice} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Quoted Price</Form.Label>
                                <Form.Control type="text" required
                                    onChange={this.handleFieldChange}
                                    id="timeToBuild" value={this.state.timeToBuild} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group>
                        <Form.Check type="checkbox" label="Builderd Contacted"
                            checked={this.state.builderContacted}
                            onChange={this.handleCheckBox}
                            id="builderContacted"></Form.Check>
                    </Form.Group>
                </Form>
                <div className="details_view">
                    <div className="image_holder">
                        <Image className="card_images" rounded variant="bottom" src={require(`../cue_images/${this.state.image}`)} alt="cue" style={{ maxHeight: 'auto' }} />
                    </div>
                    <h3>About Cue: {this.state.aboutCue}<span></span></h3>
                    <p>Builder: {this.state.builderName}</p>
                    <p>Style & Wrap names: style: {this.state.styleName} and wrap: {this.state.wrapName}</p>
                    <div className="detailsButtons">
                        <Button variant="success" type="submit" disabled={this.state.loadingStatus} onClick={this.updateUser_Cue}>
                            Save
        </Button>
                        <Button variant="primary" type="submit" onClick={this.handleReturnToCues} >
                            Back to Cues
        </Button>
                        <Button variant="danger" type="submit" onClick={this.handleDeleteCue}>Delete</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default User_CueEdit
