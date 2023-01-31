import axios from "axios";

export default class PostService {
    static BACKEND_BASE_URL = document.currentScript.getAttribute('bbu')
    //http://localhost:8000
    static UID = document.currentScript.getAttribute('ui');
    //document.currentScript.getAttribute('ui')
    //2
    static async getHomesRoomsDevices() {
        const response = await axios.get(`${this.BACKEND_BASE_URL}/api/v1.0/get_devices/${this.UID}`).catch(function (error) {
            throw error
        })
        return response.data.data
    }

    static async getDeviceState(device) {
        const response = await axios.get(`${this.BACKEND_BASE_URL}/api/v1.0/get_device_status/${this.UID}/${device.device_id}`).catch(function (error) {
            throw error
        })
        return response.data.data
    }

    static async postDeviceState(device, newDeviceState) {
        const response = await axios.post(`${this.BACKEND_BASE_URL}/api/v1.0/set_device_status/${this.UID}/${device.device_id}`, newDeviceState).catch(function (error) {
            throw error
        })
        return response.data.data
    }

    static async fetchHomes() {
        const response = await axios.get(`${this.BACKEND_BASE_URL}/api/v1.0/load_homes/${this.UID}`).catch(function (error) {
            throw error
        })
        return response.data
    }

    static async fetchRooms() {
        const response = await axios.get(`${this.BACKEND_BASE_URL}/api/v1.0/load_rooms/${this.UID}`).catch(function (error) {
            throw error
        })
        return response.data
    }

    static async fetchDevices() {
        const response = await axios.get(`${this.BACKEND_BASE_URL}/api/v1.0/load_devices/${this.UID}`).catch(function (error) {
            throw error
        })
        return response.data
    }

    static async fetchDeviceFunctions() {
        const response = await axios.get(`${this.BACKEND_BASE_URL}/api/v1.0/load_device_functions/${this.UID}`).catch(function (error) {
            throw error
        })
        return response.data
    }

    static async fetchDeviceRooms() {
        const response = await axios.get(`${this.BACKEND_BASE_URL}/api/v1.0/set_device_rooms/${this.UID}`).catch(function (error) {
            throw error
        })
        return response.data
    }

}