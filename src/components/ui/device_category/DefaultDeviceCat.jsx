import DeviceCt from "../DeviceCt";
import React, {useEffect, useState} from "react";
import DefaultDeviceCatInputs from "./DefaultDeviceCatInputs";

function DefaultDeviceCat({device,...props}) {
    const deviceCt = props.passToChild.deviceCt;
    // generate initial state
    const initialDeviceState = {}
    device.functions.map(f => {
        switch (f.type){
            case "Integer":
                initialDeviceState[f.code] = (f.values.max-f.values.min)/2+f.values.min;
                break;
            case "Boolean":
                initialDeviceState[f.code] = false;
                break;
            case "Enum":
                initialDeviceState[f.code] = f.values.range[0];
                break;
            case "String":
                initialDeviceState[f.code] = 'String';
                break;
            case "Readonly":
                initialDeviceState[f.code] = 'Readonly';
                break;
            default:
                console.log('unknown device function value type '+f.type)
        }
    })
    const [deviceState, setDeviceState] = useState(initialDeviceState);

    function BooleanFunctionStateChanger(e){
        const function_code = e.target.getAttribute('function_code')
        const function_value = e.target.checked
        console.log(`switchStateChange ${function_code} is ${function_value} for ${device.device_id}`)

        const newDeviceState = {deviceState}
        newDeviceState[function_code] = function_value;
        setDeviceState(newDeviceState)
        deviceCt.postDeviceStateMethod(device,newDeviceState)
    }
    function IntegerFunctionStateChanger(e){
        const function_code = e.target.getAttribute('function_code')
        const function_value = e.target.value
        console.log(`switchStateChange ${function_code} is ${function_value} for ${device.device_id}`)

        const newDeviceState = {deviceState}
        newDeviceState[function_code] = function_value;
        setDeviceState(newDeviceState)
        //deviceCt.postDeviceStateMethod(device,newDeviceState)
    }

    useEffect( () => {
        deviceCt.updateDeviceStateMethod(device,setDeviceState)
    },[])

    // if('cz'==device.category)
    //     console.log(device)


    if( device.status.length === 0 && device.functions.length === 0 ){
        console.log(device.device_id + " is PASSIVE device. dont render");
    }
    else {
        return (
            <div className={"col m-1 p-0 border bg-light bg-gradient card"}>
                <div className={"card-body"}>
                    <div className={"container"}>
                        <div className="row">
                            <div className="col">
                                <img
                                    src={device.icon_url}
                                    className="rounded float-start img-thumbnail me-2"
                                    alt={device.name}
                                    style={{height: "60px"}}
                                />
                            </div>
                            <div className="col">
                                <h5>{device.name}</h5>
                                <small className="text-muted">
                                    {device.category} {device.device_id}
                                </small>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                { (device.functions.length>0)
                                    ?
                                    device.functions.map(func =>
                                    {
                                        switch (func.type) {
                                            case "Boolean":
                                                return (
                                                    <div className="form-check form-switch" key={`${device.device_id}${func.code}`}>
                                                        <input className="form-check-input" type="checkbox" role="switch"
                                                               checked={deviceState[func.code]}
                                                               onChange={BooleanFunctionStateChanger}
                                                               function_code = {func.code}
                                                        />
                                                        <label className="form-check-label" htmlFor={'switch'+func.code}>{func.name}</label>
                                                    </div>
                                                );
                                                break;
                                            case "Integer":
                                                return (
                                                    <div key={`${device.device_id}${func.code}`}>
                                                        <label className="form-label"
                                                               htmlFor={`customRange${device.device_id}${func.code}`}>
                                                            {func.name}
                                                        </label>
                                                        <input type="range" className="form-range"
                                                               min={func.values.min}
                                                               max={func.values.max}
                                                               step={func.values.step}
                                                               value={deviceState[func.code]}
                                                               onChange={IntegerFunctionStateChanger}
                                                               function_code = {func.code}
                                                               id={`customRange${device.device_id}${func.code}`}
                                                        />
                                                    </div>
                                                );
                                                break;
                                            default:
                                                return (<div key={`${device.device_id}${func.code}`}>{func.code}</div>);
                                        }
                                    }

                                        // <div>{f.code}</div>
                                        // <DefaultDeviceCatInputs key={device.device_id+'f'+f.code}
                                        //                         func={f}
                                        //                         device_id={device.device_id}
                                        //                         deviceState ={deviceState}
                                        //                         setDeviceState ={setDeviceState}
                                        // />
                                    )
                                    :
                                    <div>nope</div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DefaultDeviceCat;