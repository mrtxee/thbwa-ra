import {useEffect, useState} from "react";
import 'react-toastify/dist/ReactToastify.css';

export default Dj;

function Dj({device, ...props}) {
    const deviceCt = props.passToChild.deviceCt;
    const [deviceState, setDeviceState] = useState({
        'switch_led' : false,
        'bright_value' : 30
    });
    useEffect( () => {
        deviceCt.updateDeviceStateMethod(device,setDeviceState)
    },[])

    function switchStateChange(e){
        console.log(`switchStateChange switch_led is ${e.target.checked} for ${device.device_id}`)
        const newDeviceState = {...deviceState, "switch_led": e.target.checked}
        setDeviceState(newDeviceState)
        deviceCt.postDeviceStateMethod(device,newDeviceState)
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
