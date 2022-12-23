import axios from "axios";

export default class PostService{
    static async getHomesRoomsDevices(){
        const response = await axios.get('http://localhost:8000/api/v1.0/get_devices/2')
        return response.data.data
    }
    static async getDeviceState(device){
        const response = await axios.get(`http://localhost:8000/api/v1.0/get_device_status/2/${device.device_id}`)
        return response.data.data
    }
    static async postDeviceState(device, newDeviceState){
        const response = await axios.post(`http://localhost:8000/api/v1.0/set_device_status/2/${device.device_id}`, newDeviceState)
        return response.data.data
    }
}