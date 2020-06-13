class Api {
    constructor(config) {
        this.url = config.url;
        this.headers = config.headers;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    getData() {
        return fetch(`${this.url}/cards`, {
            headers: this.headers
        })
            .then((res) => this._getResponseData(res));
    }

    getDataUser() {
        return fetch(`${this.url}/users/me`, {
            headers: this.headers
        })
            .then((res) => this._getResponseData(res));
    }

    changeData(name, about) {
        return fetch(`${this.url}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                about: about,
            })
        })
            .then((res) => this._getResponseData(res));
    }


    creatTask(name, link) {
        return fetch(`${this.url}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then((res) => this._getResponseData(res));
    }

    deleteTask(_id) {
        return fetch(`${this.url}/cards/${_id}`, {
            method: 'DELETE',
            headers: this.headers,
        })
    }

    removeLike(_id) {
        return fetch(`${this.url}/cards/like/${_id}`, {
            method: 'DELETE',
            headers: this.headers,
        }).then((res) => this._getResponseData(res));
    }

    addLike(_id) {
        return fetch(`${this.url}/cards/like/${_id}`, {
            method: 'PUT',
            headers: this.headers,
        }).then((res) => this._getResponseData(res));
    }
}

