import {useEffect, useState} from "react";
import axios from "axios";
import qs from "qs";
import SimpleToast from "../SimpleToast";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useEffectNoFirstRender} from "../../hooks/ReactHooks";

export default Dj;

function Dj({device}) {
    const [deviceState, setDeviceState] = useState({
        'switch_led' : false,
        'bright_value' : 30
    });

    function fetchDeviceStatus() {
        const loadData = (async () => {
            const response = await axios.get(
                `http://localhost:8000/api/v1.0/get_device_status/2/${device.device_id}`)
                // .then(function (response) {
                //     console.log('response OK');
                // })
                .catch(function (error) {
                    console.log('response BAD');
                    console.log(error);
                });
            //console.log(response.data.data);
            return response.data.data
        })
        loadData().then(data => {
            setDeviceState(data);
        })
        console.log("11111111 fetchDeviceStatus for "+device.device_id)
    }

    useEffect( () => {
        // получить статус этого девайса
        fetchDeviceStatus();
    },[])

    useEffectNoFirstRender( () => {
        const sendData = (async () => {
            const response = await axios.post(
                `http://localhost:8000/api/v1.0/set_device_status/2/${device.device_id}`, deviceState);
            //console.log(response.data.data);
            return response.data.data
        })
        sendData().then(data => {
            console.log(data);
            if(!data.success){
                console.log('throw toast right now!')
                toast.error("shit!",{
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }
        })

    },[deviceState])

    function switchStateChange(e){
        console.log('switch_led current is '+e.target.checked)
        setDeviceState({...deviceState, "switch_led": e.target.checked})
    }
    return (
        <div className={"col m-1 p-3 border bg-warning bg-gradient"}>
            <img
                src={device.icon_url}
                className="rounded float-start"
                alt={device.name}
                style={{height: "60px"}}
            />
            <p>
                {device.name}<br/>
                <small className="text-muted">
                    {device.category}<br/>
                    {device.device_id}
                </small>
            </p>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id={'switch'+device.device_id}
                       checked={deviceState.switch_led}
                       onChange={switchStateChange}
                />
                <label className="form-check-label" htmlFor={'switch'+device.device_id}>on/off</label>
            </div>
            bright_value: {deviceState.bright_value}
        </div>
    );
}
