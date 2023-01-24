import axios from "axios";

export default class PostService{
    static BACKEND_BASE_URL = 'http://localhost:8000'
    //document.currentScript.getAttribute('bbu')
    //http://localhost:8000
    static UID = 2//document.currentScript.getAttribute('ui');
    //document.currentScript.getAttribute('ui')
    //2
    static async getHomesRoomsDevices(){
        const response = await axios.get(`${this.BACKEND_BASE_URL}/api/v1.0/get_devices/${this.UID}`)
        return response.data.data
    }
    static async getDeviceState(device){
        const response = await axios.get(`${this.BACKEND_BASE_URL}/api/v1.0/get_device_status/${this.UID}/${device.device_id}`)
        return response.data.data
    }
    static async postDeviceState(device, newDeviceState){
        const response = await axios.post(`${this.BACKEND_BASE_URL}/api/v1.0/set_device_status/${this.UID}/${device.device_id}`, newDeviceState)
        return response.data.data
    }
}