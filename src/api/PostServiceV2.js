import axios from "axios";
import {toast_error} from "../components/ui/ToastCt";

export default class PostServiceV2 {
    static BACKEND_BASE_URL = 'http://127.0.0.1:8000';
    //static BACKEND_BASE_URL = document.currentScript.getAttribute('bbu');

    // static parseRes(res){
    //     if (!response.data.success){
    //         if(response.data.msgs[1].includes('bad tuya settings provided') || response.data.msgs[1].includes('bad settings provided')){
    //             throw new Error('badCredentialError')
    //         }
    //         //console.log(response.data)
    //         throw new Error('badDataError')
    //
    //     }
    //     else return response.data.data
    // }
    // static parseErr(err){
    //     if (!response.data.success){
    //         if(response.data.msgs[1].includes('bad tuya settings provided') || response.data.msgs[1].includes('bad settings provided')){
    //             throw new Error('badCredentialError')
    //         }
    //         //console.log(response.data)
    //         throw new Error('badDataError')
    //
    //     }
    //     else return response.data.data
    // }
    static async fetchUserData(errHandler, resHandler) {
        await axios.get(`${this.BACKEND_BASE_URL}/api/v2.0/auth/login/`, {
            headers: {Authorization: `Token ${localStorage.getItem("token")}`}
        })
            .then((res) => resHandler(res))
            .catch((err) => errHandler(err));
    }


    static async authenticateUserWithGoogleAccessToken(errHandler, resHandler, tokenResponse) {
        await axios.post(`${this.BACKEND_BASE_URL}/api/v2.0/auth/login/google/`, tokenResponse)
            .then((res) => resHandler(res))
            .catch((err) => errHandler(err));
    }

    static async registerUser(errHandler, resHandler, username, password, email, first_name, last_name) {
        const data = {username, password, email, first_name, last_name};
        await axios.post(`${this.BACKEND_BASE_URL}/api/v2.0/auth/register/`, data)
            .then((res) => resHandler(res.data))
            .catch((err) => errHandler(`${err.response.status} ${err.response.statusText} ${err.response.data}`));
    };

    static async isUniqueUsernameCheck(errHandler, resHandler, username) {
        const data = {username};
        await axios.post(`${this.BACKEND_BASE_URL}/api/v2.0/auth/uniquecheck/`, data)
            .then((res) => resHandler(res.data))
            .catch((err) => errHandler(`${err.response.status} ${err.response.statusText} ${err.response.data}`));
    };

    static async authenticateUser(errHandler, resHandler, username, password) {
        const data = {username, password};
        axios.post(`${this.BACKEND_BASE_URL}/api/v2.0/auth/login/`, data)
            .then((res) => resHandler(res.data))
            .catch((err) => errHandler(`${err.response.status} ${err.response.statusText} ${err.response.data}`));
    }

    // // OLD // OLD // OLD // OLD // OLD // OLD // OLD // OLD // OLD // OLD // OLD // OLD // OLD
    // static parseResponse(response){
    //     if (!response.data.success){
    //         if(response.data.msgs[1].includes('bad tuya settings provided') || response.data.msgs[1].includes('bad settings provided')){
    //             throw new Error('badCredentialError')
    //         }
    //         //console.log(response.data)
    //         throw new Error('badDataError')
    //
    //     }
    //     else return response.data.data
    // }
    // static async postDeviceState(device, newDeviceState) {
    //     const response = await axios.post(`${this.BACKEND_BASE_URL}/api/v1.0/set_device_status/${device.device_id}`, newDeviceState).catch(function (error) {
    //         throw error
    //     })
    //     return this.parseResponse(response)
    // }
    // static async sendRCC(device_uuid, remote_uuid, category_id, remote_index, key, key_id) {
    //     // api/v1.0/send_rcc/124176102462ab16d5fd/bffe4c709473b5ce88d4pk/999/1670108591/1670109573919/12
    //     // DEVICE_UUID, REMOTE_UUID, CATEGORY_ID, REMOTE_INDEX, KEY, KEY_ID
    //     const response = await axios.get(
    //         `${this.BACKEND_BASE_URL}/api/v1.0/send_rcc/${device_uuid}/${remote_uuid}/${category_id}/${remote_index}/${key}/${key_id}`).catch(function (error) {
    //         throw error
    //     })
    //     return this.parseResponse(response)
    // }

}