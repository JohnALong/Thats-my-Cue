import React, { Component } from 'react';
import APIManager from '../../modules/APIManager';

class User_CueDetail extends Component {

    state = {
        cue: []
    }

    handleReturnToCues = () => {
        this.props.history.push("/user_Cues")
    }

    handleSaveCue = () => {

    }

    componentDidMount() {
        // console.log("did mount top props", this.props)
        APIManager.getSingleUserCue(this.props.cueId)
            .then((cue) => {
                console.log("cue in did mount", cue)
                this.setState({
                    cue: cue
                })
            })
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