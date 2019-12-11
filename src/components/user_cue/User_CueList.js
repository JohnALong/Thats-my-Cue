import React, { Component } from 'react'
//import the components we will need
import User_CueCard from './User_CueCard'
import APIManager from '../../modules/APIManager'

class User_CueList extends Component {
    //define what this component needs to render
    state = {
        user_Cues: [],
    }

    getAllCues = () => {
        APIManager.getAll(`cues/?_expand=builder&_expand=wrap&_expand=style`)
            .then((cues) => {
                this.setState({
                    cues: cues
                })
                // console.log("cues in get all cues", cues)
            })
    }

    getAllUserCues = () => {
        const currentUser = JSON.parse(localStorage.getItem("credentials"))
        APIManager.getWithItems("users", currentUser.id, "user_cues")
            .then((user_Cues) => {
                this.setState({
                    user_Cues: user_Cues
                })
            })
    }

    componentDidMount() {
        this.getAllUserCues()
        // this.getAllCues()
    }

    render() {
        // console.log("render in list", this.state)
        return (
            <div className="container-cards">
                {this.state.user_Cues.map(user_Cue => <User_CueCard
                    key={user_Cue.id} user_Cue={user_Cue}  />
                )}
            </div>
        )
    }
}

export default User_CueList