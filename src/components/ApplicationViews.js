import { Route, Redirect } from 'react-router-dom'
import React, { Component } from 'react'
import Home from './home/Home'
import CueList from './cue/CueList'
import CueDetail from './cue/CueDetail'
import Login from './auth/Login'
//only include these once they are built - previous practice exercise
// import LocationCard from './location/LocationCard'
// import EmployeeCard from './employee/EmployeeCard'
// import OwnerCard from './owner/OwnerCard'


class ApplicationViews extends Component {

    render() {
        return (
            <React.Fragment>

                <Route path="/login" render={props => {
                    console.log("login route", props)
                    return <Login setUser={this.props.setUser} searchUsers={this.props.searchUsers} {...props} />
                }} />

                <Route exact path="/" render={(props) => {
                    return <Home />
                }} />

                <Route exact path="/cues" render={(props) => {
                    console.log("cues route", props)
                    if (this.props.user) {
                        return <CueList {...props} {...this.props} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />

                <Route path="/cues/:cueId(\d+)" render={(props) => {
                    return <CueDetail cueId={parseInt(props.match.params.cueId)} {...props} />
                }} />
            </React.Fragment>
        )
    }
}

export default ApplicationViews