const remoteURL = "http://localhost:5002"

export default {
    get(id) {
        return fetch(`${remoteURL}/cues/${id}/?_expand=builder&_expand=wrap&_expand=style`).then(result => result.json())
    },
    getAll() {
        return fetch(`${remoteURL}/cues/?_expand=builder&_expand=wrap&_expand=style`).then(result => result.json())
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
    //   fetch call to get users
    searchUser: (searchAll) => {
        return fetch(`${remoteURL}/users?&q=${searchAll}`)
            .then(users => users.json())
    },
}