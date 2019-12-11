import React, { Component } from 'react';
import APIManager from '../../modules/APIManager'


class User_CueCard extends Component {

    state = {
        image: "default_cues.jpg",
        builderName: "",
        styleName: ""
    }


    componentDidMount() {
        APIManager.get(this.props.user_Cue.cueId)
            .then((cue) => {
                console.log("cue in did mount", cue.image)
                this.setState({
                    image: cue.image,
                    builderName: cue.builder.name,
                    styleName: cue.style.styleName
                })
            })
    }

    render() {
        console.log("this.state in card", this.state)
        console.log("this.props in card", this.props)
        return (
            <div>
                <div>
                    <img src={require(`../cue_images/${this.state.image}`)} alt="cue" width={500} height={300} mode='fit' />
                    <h3>Builders Name: {this.state.builderName} </h3>
                    <p>Style & wrap info</p>
                    <p>info about this cue: {this.props.user_Cue.cue.data}</p>
                </div>
            </div>
        );
    }
}

export default User_CueCard;
{/* <img src={require(`../cue_images/${this.props.cue.image}`)} alt="cue" /> */ }