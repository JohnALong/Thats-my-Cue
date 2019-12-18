import React, { Component } from 'react'
//import the components we will need
import CueCard from './CueCard'
import APIManager from '../../modules/APIManager'
import { Form, Button, Col } from 'react-bootstrap'

class CueList extends Component {
    //define what this component needs to render
    state = {
        cues: [],
    }

    // function to control field input locations for search and filter
    handleFieldChange = event => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        console.log("state to change", stateToChange)
        this.setState(stateToChange)
    }

    // function to search by keyword
    handleSearch = () => {
        console.log("event in search", this.state.search)
        APIManager.searchCues(this.state.search)
            .then((newCues) => {
                this.setState({
                    cues: newCues
                })
            })
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
        console.log("state for search", this.state)
        return (
            <>
                <Form>
                    <Form.Group as={Col} id="searchForm">
                        <Form.Control type="text" placeholder="Search by Keyword"
                            onChange={this.handleFieldChange}
                            id="search" />
                        <Button variant="outline-success" onClick={this.handleSearch}>Search</Button>
                    </Form.Group>
                </Form>
                <div className="cardList">
                    <h1 className="cardList">All Cues</h1>
                    <div className="cards">
                        {this.state.cues.map(cue => <CueCard
                            key={cue.id} cue={cue} />
                        )}
                    </div>
                </div>
            </>
        )
    }
}

export default CueList