import React, { Component } from 'react';
import APIManager from '../../modules/APIManager';
import { Button, Image } from 'react-bootstrap';
import "../cue/CueDetail.css"

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
            <div className="details_view">
                <div className="image_holder">
                    <Image className="card_images" rounded variant="top" src={require(`../cue_images/${this.state.image}`)} alt="cue" style={{ maxHeight: 'auto' }} /></div>
                <div className="details_info">
                    <h1>User_Cue Details View</h1>
                    <h3>About Cue: {this.state.aboutCue}<span></span></h3>
                    <p>Builder: {this.state.builderName}</p>
                    <p>Style & Wrap names: style: {this.state.styleName} and wrap: {this.state.wrapName}</p>
                    <p>your notes here: {this.state.notes}</p>
                    <p>quoted price: {this.state.quotedPrice}</p>
                    <p>time to build: {this.state.timeToBuild}</p>
                    <label>builder Contacted?</label>
                    <input type="checkbox" checked={this.state.builderContacted}></input>
                </div>
                <div className="detailsButtons">
                    <Button variant="info" type="submit" onClick={this.handleEditButton}>
                        Edit</Button>
                    <Button variant="primary" type="submit" onClick={this.handleReturnToCues} >
                        Back to Cues</Button>
                    <Button variant="danger" type="submit" onClick={this.handleDeleteCue}>Delete</Button>
                </div>
            </div>
        );
    }
}

export default User_CueDetail;