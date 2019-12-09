import React, { Component } from 'react'
//import the components we will need
import CueCard from './CueCard'
import APIManager from '../../modules/APIManager'

class CueList extends Component {
    //define what this component needs to render
    state = {
        cues: [],
    }

    componentDidMount() {
        // console.log("Practice List: componentDidMount", this.props)
        APIManager.getAll()
            .then((cues) => {
                this.setState({
                    cues: cues
                })
            })
    }

    render() {
        console.log("cue LIST: Render", this.state, this.props);
        return (
            <div className="container-cards">
                {this.state.cues.map(cue => <CueCard
                    key={cue.id} cue={cue} />
                )}
            </div>
        )
    }
}

export default CueList