import { Route, Redirect } from 'react-router-dom'
import React, { Component } from 'react'
import Home from './home/Home'
import CueList from './cue/CueList'
import CueDetail from './cue/CueDetail'
import Login from './auth/Login'
import User_CueList from './user_cue/User_CueList'
import User_CueDetail from './user_cue/User_CueDetail'


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
                <Route path="/cues/:cueId(\d+)" render={(props) => {
                    return <CueDetail cueId={parseInt(props.match.params.cueId)} {...props} />
                }} />
                {/* route for user_cue list */}
                <Route exact path="/user_Cues" render={(props) => {
                    if (this.props.user) {
                        return <User_CueList {...props} {...this.props} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />

                <Route path="/user_Cues/:cueId(\d+)" render={(props) => {
                    return <User_CueDetail cueId={parseInt(props.match.params.cueId)} {...props} {...this.props} />
                }} />
            </React.Fragment>
        )
    }
}

export default ApplicationViews