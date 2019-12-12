import React, { Component } from 'react';
import APIManager from '../../modules/APIManager'
import { Link } from "react-router-dom"


class User_CueCard extends Component {

    state = {
        image: "default_cues.jpg",
        builderName: "",
        styleName: ""
    }


    componentDidMount() {
        APIManager.get(this.props.user_Cue.cueId)
            .then((cue) => {
                this.setState({
                    image: cue.image,
                    builderName: cue.builder.name,
                    styleName: cue.style.name
                })
            })
    }

    render() {
        // console.log("this.state in card", this.state)
        // console.log("this.props in card", this.props)
        return (
            <div>
                <div>
                    <img src={require(`../cue_images/${this.state.image}`)} alt="cue" width={500} height={300} mode='fit' />
                    <h3>Builders Name: {this.state.builderName} </h3>
                    <p>Style & wrap info</p>
                    <p>info about this cue: {this.props.user_Cue.cue.aboutCue}</p>
                    <Link to={`/user_Cues/${this.props.user_Cue.cueId}`}><button>Details</button></Link>
                </div>
            </div>
        );
    }
}

export default User_CueCard;
{/* <img src={require(`../cue_images/${this.props.cue.image}`)} alt="cue" /> */ }