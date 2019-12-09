import { Route } from 'react-router-dom'
import React, { Component } from 'react'
import Home from './home/Home'
import CueList from './cue/CueList'
import CueDetail from './cue/CueDetail'
//only include these once they are built - previous practice exercise
// import LocationCard from './location/LocationCard'
// import EmployeeCard from './employee/EmployeeCard'
// import OwnerCard from './owner/OwnerCard'


class ApplicationViews extends Component {

  render() {
    return (
      <React.Fragment>
        <Route exact path="/" render={(props) => {
          return <Home />
        }} />

        <Route exact path="/cues" render={(props) => {
          return <CueList {...props} {...this.props} />
        }} />

        <Route path="/cues/:cueId(\d+)" render={(props) => {
          return <CueDetail cueId={parseInt(props.match.params.cueId)} {...props} />
        }} />
      </React.Fragment>
    )
  }
}

export default ApplicationViews