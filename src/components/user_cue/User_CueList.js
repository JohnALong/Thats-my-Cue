import React, { Component } from 'react'
//import the components we will need
import User_CueCard from './User_CueCard'
import APIManager from '../../modules/APIManager'

class User_CueList extends Component {
    //define what this component needs to render
    state = {
        user_Cues: [],
    }

    // function to fetch user cue and cue data
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
    }

    render() {
        console.log("render in user cue list", this.state.user_Cues)
        return (
            <>
                <div className="cardList">
                    <h1>My Cues</h1>
                    <div className="cards">
                        {this.state.user_Cues.map(user_Cue => <User_CueCard
                            key={user_Cue.id} user_Cue={user_Cue}
                            {...this.props} />
                        )}
                    </div>
                </div>
            </>
        )
    }
}

export default User_CueList