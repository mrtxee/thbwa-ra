import axios from "axios";

export default class PostService {
    //static BACKEND_BASE_URL = 'http://127.0.0.1:8000';
    static BACKEND_BASE_URL = document.currentScript.getAttribute('bbu');

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