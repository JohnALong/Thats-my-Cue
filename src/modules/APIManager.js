const remoteURL = "http://localhost:5002"

export default {
    getSingleUserCue(id) {
        return fetch(`${remoteURL}/user_cues?cueId=${id}&_expand=cue`).then(result => result.json())
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
    //   fetch call to get users
    searchUser: (searchAll) => {
        return fetch(`${remoteURL}/users?&q=${searchAll}`)
            .then(users => users.json())
    },
    // fetch to return user cues
    getWithItems(items, id, secondaryItems) {
        return fetch(`${remoteURL}/${items}/${id}/${secondaryItems}?_expand=cue`)
          .then(result => result.json())
      }
}