import axios from "axios";

export default class PostService {
    static BACKEND_BASE_URL = 'http://127.0.0.1:8000';
    //static BACKEND_BASE_URL = document.currentScript.getAttribute('bbu');

    static parseResponse(response){
        if (!response.data.success){
            if(response.data.msgs[1].includes('bad tuya settings provided') || response.data.msgs[1].includes('bad settings provided')){
                throw new Error('badCredentialError')
            }
            //console.log(response.data)
            throw new Error('badDataError')

        }
        else return response.data.data
    }

    static async getHomesRoomsDevices() {
        const response = await axios.get(`${this.BACKEND_BASE_URL}/api/v1.0/get_devices`).catch(function (error) {
            throw error
        })
        return this.parseResponse(response)
    }

    static async getDeviceState(device) {
        //return true
        const response = await axios.get(`${this.BACKEND_BASE_URL}/api/v1.0/get_device_status/${device.device_id}`).catch(function (error) {
            throw error
        })
        return this.parseResponse(response)
    }

    static async postDeviceState(device, newDeviceState) {
        const response = await axios.post(`${this.BACKEND_BASE_URL}/api/v1.0/set_device_status/${device.device_id}`, newDeviceState).catch(function (error) {
            throw error
        })
        return this.parseResponse(response)
    }
    static async sendRCC(device_uuid, remote_uuid, category_id, remote_index, key, key_id) {
        // api/v1.0/send_rcc/124176102462ab16d5fd/bffe4c709473b5ce88d4pk/999/1670108591/1670109573919/12
        // DEVICE_UUID, REMOTE_UUID, CATEGORY_ID, REMOTE_INDEX, KEY, KEY_ID
        const response = await axios.get(
            `${this.BACKEND_BASE_URL}/api/v1.0/send_rcc/${device_uuid}/${remote_uuid}/${category_id}/${remote_index}/${key}/${key_id}`).catch(function (error) {
            throw error
        })
        return this.parseResponse(response)
    }

    static async fetchHomes() {
        const response = await axios.get(`${this.BACKEND_BASE_URL}/api/v1.0/load_homes`).catch(function (error) {
            throw error
        })
        return this.parseResponse(response)
    }

    static async fetchRooms() {
        const response = await axios.get(`${this.BACKEND_BASE_URL}/api/v1.0/load_rooms`).catch(function (error) {
            throw error
        })
        return this.parseResponse(response)
    }

    static async fetchDevices() {
        const response = await axios.get(`${this.BACKEND_BASE_URL}/api/v1.0/load_devices`).catch(function (error) {
            throw error
        })
        return this.parseResponse(response)
    }
    static async fetchRemotes() {
        //http://127.0.0.1:8000/api/v1.0/load_remotes
        const response = await axios.get(`${this.BACKEND_BASE_URL}/api/v1.0/load_remotes`).catch(function (error) {
            throw error
        })
        return this.parseResponse(response)
    }

    static async fetchDeviceFunctions() {
        const response = await axios.get(`${this.BACKEND_BASE_URL}/api/v1.0/load_device_functions`).catch(function (error) {
            throw error
        })
        return this.parseResponse(response)
    }

    static async fetchDeviceRooms() {
        const response = await axios.get(`${this.BACKEND_BASE_URL}/api/v1.0/set_device_rooms`).catch(function (error) {
            throw error
        })
        return this.parseResponse(response)
    }

}