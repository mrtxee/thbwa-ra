import axios from "axios";

export default class PostServiceV2 {
    //static BACKEND_BASE_URL = 'http://127.0.0.1:8000';
    //static BACKEND_BASE_URL = 'http://tuyahome.online:90';
    //static BACKEND_BASE_URL = 'https://tuyahome.online:90';
    static BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

    static async fetchHomes(errHandler, resHandler) {
        if (!localStorage.getItem("token")) return;
        await axios.put(`${this.BACKEND_BASE_URL}/api/v2.0/homes/load/`, {}, {
            headers: {
                Authorization: `Token ${localStorage.getItem("token")}`,
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then((res) => resHandler(res.data, res))
            //.catch((err) => errHandler(`${err.response.status} ${err.response.statusText} ${err.response.data}`.substring(0, 199), err.response));
            .catch((err) => errHandler(err));
    }

    static async fetchRooms(errHandler, resHandler) {
        if (!localStorage.getItem("token")) return;
        await axios.put(`${this.BACKEND_BASE_URL}/api/v2.0/rooms/load/`, {}, {
            headers: {
                Authorization: `Token ${localStorage.getItem("token")}`,
                'Access-Control-Allow-Origin': '*'
            }

        })
            .then((res) => resHandler(res.data, res))
            .catch((err) => errHandler(`${err.response.status} ${err.response.statusText} ${err.response.data}`.substring(0, 199), err.response));
    }

    static async fetchDevices(errHandler, resHandler) {
        if (!localStorage.getItem("token")) return;
        await axios.put(`${this.BACKEND_BASE_URL}/api/v2.0/devices/load/`, {}, {
            headers: {Authorization: `Token ${localStorage.getItem("token")}`}
        })
            .then((res) => resHandler(res.data, res))
            .catch((err) => errHandler(`${err.response.status} ${err.response.statusText} ${err.response.data}`.substring(0, 199), err.response));
    }

    static async fetchDeviceFunctions(errHandler, resHandler) {
        if (!localStorage.getItem("token")) return;
        await axios.put(`${this.BACKEND_BASE_URL}/api/v2.0/devices/functions/load/`, {}, {
            headers: {Authorization: `Token ${localStorage.getItem("token")}`}
        })
            .then((res) => resHandler(res.data, res))
            .catch((err) => errHandler(`${err.response.status} ${err.response.statusText} ${err.response.data}`.substring(0, 199), err.response));
    }

    static async fetchRemotes(errHandler, resHandler) {
        if (!localStorage.getItem("token")) return;
        await axios.put(`${this.BACKEND_BASE_URL}/api/v2.0/devices/remotes/load/`, {}, {
            headers: {Authorization: `Token ${localStorage.getItem("token")}`}
        })
            .then((res) => resHandler(res.data, res))
            .catch((err) => errHandler(`${err.response.status} ${err.response.statusText} ${err.response.data}`.substring(0, 199), err.response));
    }

    static async fetchDeviceRooms(errHandler, resHandler) {
        if (!localStorage.getItem("token")) return;
        await axios.put(`${this.BACKEND_BASE_URL}/api/v2.0/rooms/devices/load/`, {}, {
            headers: {Authorization: `Token ${localStorage.getItem("token")}`}
        })
            .then((res) => resHandler(res.data, res))
            .catch((err) => errHandler(`${err.response.status} ${err.response.statusText} ${err.response.data}`.substring(0, 199), err.response));
    }

    static async sendRCC(errHandler, resHandler, device_uuid, rcc) {
        if (!localStorage.getItem("token")) return;
        await axios.put(`${this.BACKEND_BASE_URL}/api/v2.0/devices/${device_uuid}/rcc/`, rcc, {
            headers: {Authorization: `Token ${localStorage.getItem("token")}`}
        })
            .then((res) => resHandler(res.data, res))
            .catch((err) => errHandler(`${err.response.status} ${err.response.statusText} ${err.response.data}`.substring(0, 199), err.response));
    }

    static async putDeviceState(errHandler, resHandler, device_uuid, state) {
        if (!localStorage.getItem("token")) return;
        await axios.put(`${this.BACKEND_BASE_URL}/api/v2.0/devices/${device_uuid}/status/`, state, {
            headers: {Authorization: `Token ${localStorage.getItem("token")}`}
        })
            .then((res) => resHandler(res.data, res))
            .catch((err) => errHandler(`${err.response.status} ${err.response.statusText} ${err.response.data}`.substring(0, 199), err.response));
    }

    static async getDeviceState(errHandler, resHandler, device_uuid) {
        if (!localStorage.getItem("token")) return;
        await axios.get(`${this.BACKEND_BASE_URL}/api/v2.0/devices/${device_uuid}/status/`, {
            headers: {Authorization: `Token ${localStorage.getItem("token")}`}
        })
            .then((res) => resHandler(res.data, res))
            .catch((err) => errHandler(`${err.response.status} ${err.response.statusText} ${err.response.data}`.substring(0, 199), err.response));
    }

    static async getHomesRoomsDevices(errHandler, resHandler) {
        if (!localStorage.getItem("token")) return;
        await axios.get(`${this.BACKEND_BASE_URL}/api/v2.0/homes/`, {
            headers: {Authorization: `Token ${localStorage.getItem("token")}`}
        })
            .then((res) => resHandler(res.data, res))
            .catch((err) => errHandler(`${err.response.status} ${err.response.statusText} ${err.response.data}`.substring(0, 199), err.response));
    }

    static async passwordReset(errHandler, resHandler, data) {
        await axios.post(`${this.BACKEND_BASE_URL}/api/v2.0/auth/resetpass/`, data)
            .then((res) => resHandler(res.data, res))
            .catch((err) => errHandler(`${err.response.status} ${err.response.statusText} ${err.response.data}`.substring(0, 199), err.response));
    };

    static async updateUserPassword(errHandler, resHandler, data) {
        await axios.post(`${this.BACKEND_BASE_URL}/api/v2.0/user/newpass/`, data, {headers: {Authorization: `Token ${localStorage.getItem("token")}`}})
            .then((res) => resHandler(res.data, res))
            .catch((err) => errHandler(`${err.response.status} ${err.response.statusText} ${err.response.data}`.substring(0, 199), err.response));
    };

    static async updateUserData(errHandler, resHandler, data) {
        await axios.post(`${this.BACKEND_BASE_URL}/api/v2.0/user/`, data, {headers: {Authorization: `Token ${localStorage.getItem("token")}`}})
            .then((res) => resHandler(res.data, res))
            .catch((err) => errHandler(`${err.response.status} ${err.response.statusText} ${err.response.data}`.substring(0, 199), err.response));
    };

    static async updateUserSettings(errHandler, resHandler, data) {
        await axios.post(`${this.BACKEND_BASE_URL}/api/v2.0/user/settings/`, data, {headers: {Authorization: `Token ${localStorage.getItem("token")}`}})
            .then((res) => resHandler(res.data, res))
            .catch((err) => errHandler(`${err.response.status} ${err.response.statusText} ${err.response.data}`.substring(0, 199), err.response));
    };

    static async getUserData(errHandler, resHandler) {
        if (!localStorage.getItem("token")) return;
        await axios.get(`${this.BACKEND_BASE_URL}/api/v2.0/user/`, {
            headers: {Authorization: `Token ${localStorage.getItem("token")}`}
        })
            .then((res) => resHandler(res.data, res))
            .catch((err) => errHandler(`${err.response.status} ${err.response.statusText} ${err.response.data}`.substring(0, 199), err.response));
    }

    static async getUserSettings(errHandler, resHandler) {
        if (!localStorage.getItem("token")) return;
        await axios.get(`${this.BACKEND_BASE_URL}/api/v2.0/user/settings/`, {
            headers: {Authorization: `Token ${localStorage.getItem("token")}`}
        })
            .then((res) => resHandler(res.data, res))
            .catch((err) => errHandler(`${err.response.status} ${err.response.statusText} ${err.response.data}`.substring(0, 199), err.response));
    }

    static async getUserLogin(errHandler, resHandler) {
        if (!localStorage.getItem("token")) return;
        await axios.get(`${this.BACKEND_BASE_URL}/api/v2.0/auth/login/`, {
            headers: {Authorization: `Token ${localStorage.getItem("token")}`}
        })
            .then((res) => resHandler(res.data, res))
            .catch((err) => errHandler(`${err.response.status} ${err.response.statusText} ${err.response.data}`.substring(0, 199), err.response));
    }

    static async userLogoutEverywhere(errHandler, resHandler) {
        if (!localStorage.getItem("token")) return;
        await axios.get(`${this.BACKEND_BASE_URL}/api/v2.0/auth/logout/all/`, {
            headers: {Authorization: `Token ${localStorage.getItem("token")}`}
        })
            .then((res) => resHandler(res.data, res))
            .catch((err) => errHandler(`${err.response.status} ${err.response.statusText} ${err.response.data}`.substring(0, 199), err.response));
    }

    static async authenticateUserWithGoogleAccessToken(errHandler, resHandler, tokenResponse) {
        await axios.post(`${this.BACKEND_BASE_URL}/api/v2.0/auth/login/google/`, tokenResponse)
            .then((res) => resHandler(res.data, res))
            .catch((err) => errHandler(`${err.response.status} ${err.response.statusText} ${err.response.data}`.substring(0, 199), err.response));
    }

    static async registerUser(errHandler, resHandler, data) {
        await axios.post(`${this.BACKEND_BASE_URL}/api/v2.0/auth/register/`, data)
            .then((res) => resHandler(res.data, res))
            .catch((err) => errHandler(`${err.response.status} ${err.response.statusText} ${err.response.data}`.substring(0, 199), err.response));
    };

    static async isUniqueUsernameCheck(errHandler, resHandler, data) {
        await axios.post(`${this.BACKEND_BASE_URL}/api/v2.0/auth/uniquecheck/`, data)
            .then((res) => resHandler(res.data, res))
            .catch((err) => errHandler(`${err.response.status} ${err.response.statusText} ${err.response.data}`.substring(0, 199), err.response));
    };

    static async authenticateUser(errHandler, resHandler, data) {
        await axios.post(`${this.BACKEND_BASE_URL}/api/v2.0/auth/login/`, data)
            .then((res) => resHandler(res.data, res))
            .catch((err) => errHandler(`${err.response.status} ${err.response.statusText} ${err.response.data}`.substring(0, 199), err.response));
    }
}