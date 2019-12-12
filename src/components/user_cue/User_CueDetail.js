import React, { Component } from 'react';
import APIManager from '../../modules/APIManager';

// variable to hold this users cue
let this_user_cue = []

// variable to hold this users cue details
let this_user_cue_details = []
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
    }

    handleReturnToCues = () => {
        this.props.history.push("/user_Cues")
    }

    handleSaveCue = () => {

    }

    getThisUsersCueDetails = () => {
        return APIManager.get(this.props.cueId)
            .then((cueDetails) => {
                this_user_cue_details = cueDetails
                // console.log("this_user_cue_details", this_user_cue_details)
                return this_user_cue_details
            })
    }

    getThisUsersCue = () => {
        return APIManager.getSingleUserCue(this.props.cueId)
            .then((cue) => {
                this_user_cue = cue
                // console.log("this_user_cue", this_user_cue)
                return this_user_cue
            })
    }

    // .then(() => { console.log("user_cue in did mount", this_user_cue) })
    // .then(() => { console.log("this user cue details in mount", this_user_cue_details) })
    componentDidMount() {
        this.getThisUsersCue()
        this.getThisUsersCueDetails()
            .then(() => {
                // console.log("did mount", this_user_cue_details)
                this.setState({
                    image: this_user_cue_details.image,
                    builderName: this_user_cue_details.builder.name,
                    wrapName: this_user_cue_details.wrap.name,
                    styleName: this_user_cue_details.style.name,
                    aboutCue: this_user_cue_details.aboutCue,
                    notes: this_user_cue[0].notes,
                    quotedPrice: this_user_cue[0].quotedPrice,
                    builderContacted: this_user_cue[0].builderContacted,
                    timeToBuild: this_user_cue[0].timeToBuild,
                })
            })
    }

    render() {
        console.log("detail props", this.props)
        console.log("detail state", this.state)
        return (
            <div className="card">
                <div className="card-content">
                <img src={require(`../cue_images/${this.state.image}`)} alt="cue" />
                    <h3>About Cue: {this.state.aboutCue}<span></span></h3>
                    <p>Builder: {this.state.builderName}</p>
                    <p>Style & Wrap names: style: {this.state.styleName} and wrap: {this.state.wrapName}</p>
                    <p>your notes here: {this.state.notes}</p>
                    <p>quoted price: {this.state.quotedPrice}</p>
                    <p>time to build: {this.state.timeToBuild}</p>
                    <label>builder Contacted?</label>
                    <input type="checkbox" value={this.state.builderContacted}></input>
                </div>
                <div className="detailsButtons">
                    <button type="submit" >
                        Save
            </button>
                    <button type="submit" onClick={this.handleReturnToCues} >
                        Back to Cues
            </button>
                </div>
            </div>
        );
    }
}

export default User_CueDetail;