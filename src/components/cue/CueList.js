import React, { Component } from 'react'
//import the components we will need
import CueCard from './CueCard'
import APIManager from '../../modules/APIManager'
import { Form, Button, Col } from 'react-bootstrap'
import "./CueCard.css"

class CueList extends Component {
    //define what this component needs to render
    state = {
        cues: [],
        wraps: [],
        builders: [],
        styles: [],
    }

    // function to control field input locations for search and filter
    handleFieldChange = event => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        console.log("state to change", stateToChange)
        this.setState(stateToChange)
    }

    // function to search by keyword
    handleFilter = evt => {
        evt.preventDefault()
        console.log("event in search", this.state.search)
        APIManager.searchCues(this.state.search)
            .then((newCues) => {
                console.log("newCues", newCues)
                this.setState({
                    cues: newCues,
                })
            })
    }

    handleSearch = evt => {
        evt.preventDefault()
        console.log("event in search", this.state)
        APIManager.searchCues(this.state.search)
            .then((newCues) => {
                console.log("newCues", newCues)
                this.setState({
                    cues: newCues,
                })
            })
        evt.target.reset()
    }

    componentDidMount() {

        Promise.all([
            APIManager.getAll(`wraps`),
            APIManager.getAll(`builders`),
            APIManager.getAll(`styles`),
            APIManager.getAll(`cues/?_expand=builder&_expand=wrap&_expand=style`)])
            .then(([wraps, builders, styles, cues]) => {
                // console.log("cues in did mount", cues)
                this.setState({
                    wraps: wraps,
                    builders: builders,
                    styles: styles,
                    cues: cues
                })
            })
    }

    render() {
        console.log("wrap test", this.state.cues)
        return (
            <>
                <Form onSubmit={this.handleSearch}>
                    <Form.Group as={Col} id="searchForm">
                        <Form.Control type="text" placeholder="Search by Keyword"
                            onChange={this.handleFieldChange}
                            id="search" />
                        <Button type="submit" variant="outline-success">Search</Button>
                    </Form.Group>
                    <Form.Label>Select mood to filter entries</Form.Label>
                    <select className="form-control" onChange={this.handleFilter}>
                        {[...this.state.wraps, ...this.state.builders, ...this.state.styles].map(x =>
                            <option key={x.id} value={x.name}>{x.name}
                            </option>
                        )}
                    </select>
                </Form>
                <h1 className="listHeader">Available Cues</h1>
                <div className="cue_cards">
                    {this.state.cues.map(cue => <CueCard
                        key={cue.id} cue={cue} user={this.props.user} />
                    )}
                </div>
            </>
        )
    }
}

export default CueList