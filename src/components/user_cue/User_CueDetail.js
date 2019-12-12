import React, { Component } from 'react';
import APIManager from '../../modules/APIManager';

class User_CueDetail extends Component {

    state = {
        cue: [],
        cueDetails: []
    }

    handleReturnToCues = () => {
        this.props.history.push("/user_Cues")
    }

    handleSaveCue = () => {

    }

    getThisUsersCueDetails = () => {
        APIManager.get(this.props.cueId)
        .then((cueDetails) => {
            console.log("cue in get user cue details", cueDetails)
            this.setState({
                cueDetails: cueDetails
            })
        })
    }

    getThisUsersCue = () => {
        APIManager.getSingleUserCue(this.props.cueId)
            .then((cue) => {
                console.log("cue in get this user cue", cue)
                this.setState({
                    cue: cue
                })
            })  
    }

    componentDidMount() {
       this.getThisUsersCue()
       this.getThisUsersCueDetails()
    }

    render() {
        console.log("detail props", this.props)
        console.log("detail state", this.state)
        return (
            <div className="card">
                <div className="card-content">
                    <h3>Name: <span></span></h3>
                    <p>Builder:is this working?</p>
                    <p>Details: </p>
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