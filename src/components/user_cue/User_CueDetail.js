import React, { Component } from 'react';
import APIManager from '../../modules/APIManager';
import { Button, Image, Jumbotron, Card } from 'react-bootstrap';
import "./User_CueDetail.css"

class User_CueDetail extends Component {

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
    }

    handleReturnToCues = () => {
        this.props.history.push("/user_Cues")
    }

    handleEditButton = () => {
        this.props.history.push(`/user_Cues/${this.props.id}/edit`)
    }

    handleDeleteCue = () => {
        APIManager.delete("user_cues", this.props.id)
            .then(() => {
                this.props.history.push("/user_Cues")
            })
    }
    getThisUsersCueDetails = (cueId) => {
        return APIManager.get(cueId)
            .then((user_cue_info) => {
                return user_cue_info

            })
    }


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
                            userCueId: user_cue.cueId
                        })
                        console.log("user_cue_info and user_cue line 51", user_cue_info, user_cue)
                    })
            })
    }

    componentDidMount() {
        this.getThisUsersCue()
    }

    render() {
        // console.log("detail props", this.props)
        // console.log("detail state", this.state)
        return (
            <Jumbotron className="user_details_view">
                <Card className="user_details_info">
                    <Card.Header>User_Cue Details View</Card.Header>
                    <Card.Body>About Cue: {this.state.aboutCue}<span></span></Card.Body>
                    <Card.Body>Builder: {this.state.builderName}</Card.Body>
                    <Card.Body>Style & Wrap names: style: {this.state.styleName} and wrap: {this.state.wrapName}</Card.Body>
                    <Card.Body>your notes here: {this.state.notes}</Card.Body>
                    <Card.Body>quoted price: {this.state.quotedPrice}</Card.Body>
                    <Card.Body>time to build: {this.state.timeToBuild}</Card.Body>
                    <label>builder Contacted?</label>
                    <input type="checkbox" checked={this.state.builderContacted}></input>
                    <div className="user_detailsButtons">
                        <Button variant="info" type="submit" onClick={this.handleEditButton}>
                            Edit</Button>
                        <Button variant="primary" type="submit" onClick={this.handleReturnToCues} >
                            Back to Cues</Button>
                        <Button variant="danger" type="submit" onClick={this.handleDeleteCue}>Delete</Button>
                    </div>
                </Card>
                <div className="user_details_image_holder">
                    <Image src={require(`../cue_images/${this.state.image}`)} alt="cue" /></div>
            </Jumbotron>
        );
    }
}

export default User_CueDetail;