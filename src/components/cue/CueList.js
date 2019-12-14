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
        APIManager.getAll(`cues/?_expand=builder&_expand=wrap&_expand=style`)
            .then((cues) => {
                this.setState({
                    cues: cues
                })
            })
    }

    render() {
        return (
            <>
            <h1 className="cardList">All Cues</h1>
            <div className="cards">
                {this.state.cues.map(cue => <CueCard
                    key={cue.id} cue={cue} />
                )}
            </div>
            </>
        )
    }
}

export default CueList