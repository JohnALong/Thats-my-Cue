import React, { Component } from 'react'
import APIManager from '../../modules/APIManager'

class User_CueEdit extends Component {
    state = {
        image: "default_cues.jpg",
        builderName: "",
        wrapName: "",
        styleName: "",
        aboutCue: "",
        notes: "",
        quotedPrice: "",
        builderContacted: false,
        timeToBuild: "",
        userCueId: "",
        loadingStatus: true
    }

    getThisUsersCueDetails = (cueId) => {
        return APIManager.get(cueId)
            .then((user_cue_info) => {
                return user_cue_info

            })
    }

    getThisUsersCue = () => {
        console.log("get this cue fetch", this.props.id)
        return APIManager.getSingleUserCue(this.props.id)
            .then((user_cue) => {
                return user_cue
            })
            .then((user_cue) => {
                this.getThisUsersCueDetails(user_cue.cueId)
                    .then((user_cue_info) => {
                        this.setState({
                            image: user_cue_info.image,
                            builderName: user_cue_info.builder.name,
                            wrapName: user_cue_info.wrap.name,
                            styleName: user_cue_info.style.name,
                            aboutCue: user_cue_info.aboutCue,
                            notes: user_cue.notes,
                            quotedPrice: user_cue.quotedPrice,
                            builderContacted: user_cue.builderContacted,
                            timeToBuild: user_cue.timeToBuild,
                            userCueId: user_cue.cueId,
                            loadingStatus: false
                        })
                        console.log("user_cue_info and user_cue line 51", user_cue_info, user_cue)
                    })
            })
    }

    handleReturnToCues = () => {
        this.props.history.push("/user_Cues")
    }

    handleDeleteCue = () => {
        APIManager.delete("user_cues", this.props.id)
            .then(() => {
                this.props.history.push("/user_Cues")
            })
    }

    // function to control which portions can be updated
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    // to handle checkbox true/false
    handleCheckBox = evt => {
        this.setState({ builderContacted: !this.state.builderContacted })
    }

    updateUser_Cue = evt => {
        evt.preventDefault()
        this.setState({ loadingStatus: true })
        const editedUser_Cue = {
            id: this.props.match.params.id,
            notes: this.state.notes,
            quotedPrice: this.state.quotedPrice,
            builderContacted: this.state.builderContacted,
            timeToBuild: this.state.timeToBuild,
        }
        APIManager.updateSelectedSection("user_cues", editedUser_Cue)
            .then(() => this.props.history.push("/user_Cues"))
    }

    componentDidMount() {
        this.getThisUsersCue()
    }

    render() {
        console.log("edit props", this.props)
        console.log("edit state", this.state)
        return (
            <div>
                <div>
                    <h1>Edit page</h1>
                    <img src={require(`../cue_images/${this.state.image}`)} alt="cue" />
                    <h3>About Cue: {this.state.aboutCue}<span></span></h3>
                    <p>Builder: {this.state.builderName}</p>
                    <p>Style & Wrap names: style: {this.state.styleName} and wrap: {this.state.wrapName}</p>
                    <form>edited part
                    <input type="text" required
                            onChange={this.handleFieldChange}
                            id="notes" value={this.state.notes} />
                        <input type="text" required
                            onChange={this.handleFieldChange}
                            id="quotedPrice" value={this.state.quotedPrice} />
                        <input type="text" required
                            onChange={this.handleFieldChange}
                            id="timeToBuild" value={this.state.timeToBuild} />
                        <div>
                            <label>builder Contacted?</label>
                            <input type="checkbox"
                                checked={this.state.builderContacted}
                                onChange={this.handleCheckBox}
                                id="builderContacted"></input>
                        </div>
                    </form>
                </div>
                <div>
                    <button type="submit" disabled={this.state.loadingStatus} onClick={this.updateUser_Cue}>
                        Save
        </button>
                    <button type="submit" onClick={this.handleReturnToCues} >
                        Back to Cues
        </button>
                    <button type="submit" onClick={this.handleDeleteCue}>Delete</button>
                </div>
            </div>
        )
    }
}

export default User_CueEdit
