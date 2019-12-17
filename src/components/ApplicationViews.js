import { Route, Redirect } from 'react-router-dom'
import React, { Component } from 'react'
import Home from './home/Home'
import CueList from './cue/CueList'
import CueDetail from './cue/CueDetail'
import Login from './auth/Login'
import User_CueList from './user_cue/User_CueList'
import User_CueDetail from './user_cue/User_CueDetail'
import User_CueEdit from './user_cue/User_CueEdit'
import RandomCueDetail from './cue/randomCueDetail'


class ApplicationViews extends Component {

    render() {

        return (
            <React.Fragment>
                {/* route to login */}
                <Route path="/login" render={props => {
                    console.log("login route", props)
                    return <Login setUser={this.props.setUser} searchUsers={this.props.searchUsers} {...props} />
                }} />
                {/* route for home */}
                <Route exact path="/" render={(props) => {
                    return <Home />
                }} />
                {/* route for randomcue view */}
                <Route path="/randomCue" render={(props) => {
                    console.log("random cue route", this.props.user)
                    if (this.props.user) {
                        return <RandomCueDetail {...props} {...this.props} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />

                {/* route for cues list */}
                <Route exact path="/cues" render={(props) => {
                    console.log("cues route", props)
                    if (this.props.user) {
                        return <CueList {...props} {...this.props} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                {/* route for cue details */}
                <Route path="/cues/:id(\d+)" render={(props) => {
                    console.log("cues list to details view", props)
                    return <CueDetail id={parseInt(props.match.params.id)} {...props} />
                }} />
                {/* route for user_cue list */}
                <Route exact path="/user_Cues" render={(props) => {
                    if (this.props.user) {
                        return <User_CueList {...props} {...this.props} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                {/* route for user_cue single cue details (notice path by id of user_cue not cueId - many people may have same cue saved) */}
                <Route
                    path="/user_Cues/:id(\d+)/edit" render={props => {
                        return <User_CueEdit id={parseInt(props.match.params.id)} {...props} {...this.props} />
                    }}
                />

                <Route exact path="/user_Cues/:id(\d+)" render={(props) => {
                    // console.log("props in details route", props)
                    return <User_CueDetail id={parseInt(props.match.params.id)} {...props} {...this.props} />
                }} />

            </React.Fragment>
        )
    }
}

export default ApplicationViews