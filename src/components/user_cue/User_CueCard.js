import React, { Component } from 'react';


class User_CueCard extends Component {
    render() {
        console.log("this.props in card", this.props)
        return (
            <div>
                <div>
                    <h1>This will be an image</h1>
                    <h3>Builders Name</h3>
                    <p>Style & wrap info</p>
                    <p>info about this cue: {this.props.user_Cue.cue.data}</p>
                </div>
            </div>
        );
    }
}

export default User_CueCard;