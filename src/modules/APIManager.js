const remoteURL = "http://localhost:5002"

export default {
    getSingleUserCue(id) {
        return fetch(`${remoteURL}/user_cues/${id}`).then(result => result.json())
    },

    get(id) {
        return fetch(`${remoteURL}/cues/${id}/?_expand=builder&_expand=wrap&_expand=style`).then(result => result.json())
    },
    getAll(items) {
        return fetch(`${remoteURL}/${items}`).then(result => result.json())
    },
    post(items, newItem) {
        return fetch(`${remoteURL}/${items}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newItem)
        }).then(data => data.json())
    },
    // edit will only be used to edit user_cue
    update(items, editedItem) {
        return fetch(`${remoteURL}/${items}/${editedItem.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedItem)
        }).then(data => data.json());
    },
    // patch method for user_cue update for edits - everything can be edited except cueId
    updateSelectedSection(items, editedItem) {
        return fetch(`${remoteURL}/${items}/${editedItem.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedItem)
        }).then(data => data.json());
    },
    // delete will only be used to delete user_cue
    delete(items, id) {
        return fetch(`${remoteURL}/${items}/${id}`, {
            method: "DELETE"
        })
            .then(result => result.json())
    },
    //   fetch call to get users
    searchUser: (searchAll) => {
        return fetch(`${remoteURL}/users?&q=${searchAll}`)
            .then(users => users.json())
    },
    // fetch to return user cues
    getWithItems(items, id, secondaryItems) {
        return fetch(`${remoteURL}/${items}/${id}/${secondaryItems}?_expand=cue`)
            .then(result => result.json())
    },
    // fetch to search by keyword
    searchCues: (searchAll) => {
        return fetch(`${remoteURL}/cues/?_expand=builder&_expand=wrap&_expand=style&q=${searchAll}`)
            .then(users => users.json())
    },
}