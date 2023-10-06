/* eslint-disable no-underscore-dangle */
const api = {
    BASE_URL: 'https://forum-api.dicoding.dev/v1',

    async _fetchWithAuth(url, options = {}) {
        return fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${this.getAccessToken()}`,
            },
        });
    },

    getAccessToken() {
        return localStorage.getItem('accessToken');
    },

    putAccessToken(token) {
        localStorage.setItem('accessToken', token);
    },

    removeAccessToken() {
        localStorage.removeItem('accessToken');
    },

    async register({ email, name, password }) {
        const response = await fetch(`${this.BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email, name, password,
            }),
        });

        const responseJson = await response.json();
        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }

        const { data: { user } } = responseJson;

        return user;
    },

    async login({ email, password }) {
        const response = await fetch(`${this.BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email, password,
            }),
        });

        const responseJson = await response.json();
        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }

        const { data: { token } } = responseJson;
        return token;
    },

    async getOwnProfile() {
        const response = await this._fetchWithAuth(`${this.BASE_URL}/users/me`);
        const responseJson = await response.json();

        const { status, message } = responseJson;
        if (status !== 'success') {
            throw new Error(message);
        }

        const { data: { user } } = responseJson;

        return user;
    },

    async getAllUsers() {
        const response = await fetch(`${this.BASE_URL}/users`);
        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }

        const { data: { users } } = responseJson;
        return users;
    },

    async getAllThread() {
        const response = await fetch(`${this.BASE_URL}/threads`);
        const responseJson = await response.json();
        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }

        const { data: { threads } } = responseJson;

        return threads;
    },

    async getDetailThread(id) {
        const response = await fetch(`${this.BASE_URL}/threads/${id}`);
        const responseJson = await response.json();

        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }

        const { data: { detailThread } } = responseJson;

        return detailThread;
    },

    async createThread({ title, body, category = '' }) {
        const response = await this._fetchWithAuth(`${this.BASE_URL}/threads`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title, body, category,
            }),
        });

        const responseJson = await response.json();
        const { status, message } = responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }
        const { data: { thread } } = responseJson;
        return thread;
    },

    async createComment({ content, id }) {
        const response = await this._fetchWithAuth(`${this.BASE_URL}/threads/${id}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content,
            }),
        });

        const responseJson = await response.json();
        const { status, message } = await responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }

        const { data: { comment } } = responseJson;
        return comment;
    },

    async upVote(threadId) {
        const response = await this._fetchWithAuth(`${this.BASE_URL}/threads/${threadId}/up-vote`, {
            method: 'POST',
        });
        const responseJson = await response.json();
        const { status, message } = await responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }
        const { data: { vote } } = responseJson;
        return vote;
    },

    async downVote(threadId) {
        const response = await this._fetchWithAuth(`${this.BASE_URL}/threads/${threadId}/down-vote`, {
            method: 'POST',
        });
        const responseJson = await response.json();
        const { status, message } = await responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }
        const { data: { vote } } = responseJson;
        return vote;
    },

    async neutralVote(threadId) {
        const response = await this._fetchWithAuth(`${this.BASE_URL}/threads/${threadId}/neutral-vote`, {
            method: 'POST',
        });
        const responseJson = await response.json();
        const { status, message } = await responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }
        const { data: { vote } } = responseJson;
        return vote;
    },

    async getLeaderboards() {
        const response = await this._fetchWithAuth(`${this.BASE_URL}/leaderboards`);
        const responseJson = await response.json();
        const { status, message } = await responseJson;

        if (status !== 'success') {
            throw new Error(message);
        }
        const { data: { leaderboards } } = responseJson;
        return leaderboards;
    },
};

export default api;
