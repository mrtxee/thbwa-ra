import axios from "axios";

export default class PostServiceV2 {
    static BACKEND_BASE_URL = 'http://127.0.0.1:8000';

    //static BACKEND_BASE_URL = document.currentScript.getAttribute('bbu');

    static async getUserdata(errHandler, resHandler) {
        if (!localStorage.getItem("token")) return;
        await axios.get(`${this.BACKEND_BASE_URL}/api/v2.0/auth/login/`, {
            headers: {Authorization: `Token ${localStorage.getItem("token")}`}
        })
            .then((res) => resHandler(res.data, res))
            .catch((err) => errHandler(`${err.response.status} ${err.response.statusText} ${err.response.data}`, err.response));
    }

    static async userLogoutEverywhere(errHandler, resHandler) {
        if (!localStorage.getItem("token")) return;
        await axios.get(`${this.BACKEND_BASE_URL}/api/v2.0/auth/logout/`, {
            headers: {Authorization: `Token ${localStorage.getItem("token")}`}
        })
            .then((res) => resHandler(res.data, res))
            .catch((err) => errHandler(`${err.response.status} ${err.response.statusText} ${err.response.data}`, err.response));
    }

    static async authenticateUserWithGoogleAccessToken(errHandler, resHandler, tokenResponse) {
        await axios.post(`${this.BACKEND_BASE_URL}/api/v2.0/auth/login/google/`, tokenResponse)
            .then((res) => resHandler(res.data, res))
            .catch((err) => errHandler(`${err.response.status} ${err.response.statusText} ${err.response.data}`, err.response));
    }

    static async registerUser(errHandler, resHandler, username, password, email, first_name, last_name) {
        const data = {username, password, email, first_name, last_name};
        await axios.post(`${this.BACKEND_BASE_URL}/api/v2.0/auth/register/`, data)
            .then((res) => resHandler(res.data, res))
            .catch((err) => errHandler(`${err.response.status} ${err.response.statusText} ${err.response.data}`, err.response));
    };

    static async isUniqueUsernameCheck(errHandler, resHandler, username) {
        const data = {username};
        await axios.post(`${this.BACKEND_BASE_URL}/api/v2.0/auth/uniquecheck/`, data)
            .then((res) => resHandler(res.data, res))
            .catch((err) => errHandler(`${err.response.status} ${err.response.statusText} ${err.response.data}`, err.response));
    };

    static async authenticateUser(errHandler, resHandler, username, password) {
        const data = {username, password};
        axios.post(`${this.BACKEND_BASE_URL}/api/v2.0/auth/login/`, data)
            .then((res) => resHandler(res.data, res))
            .catch((err) => errHandler(`${err.response.status} ${err.response.statusText} ${err.response.data}`, err.response));
    }
}