import DeviceCt from "../DeviceCt";
import React, {useEffect, useRef, useState} from "react";
import { debounce } from "lodash"
import DefaultDeviceCatInputs from "./DefaultDeviceCatInputs";

function CommonDevice({device,...props}) {
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
            case "Json":
                initialDeviceState[f.code] = 'Readonly';
                break;
            default:
                console.log('unknown device function value type '+f.type)
        }
    })
    const [deviceState, setDeviceState] = useState(initialDeviceState);
    const debouncedSendRequest = useRef(debounce(deviceCt.postDeviceStateMethod, 2000)).current

    function ChangeHandler(function_code, function_value, updateDebounced){
        console.log(`switchStateChange ${function_code} is ${function_value} for ${device.device_id}`)
        const newDeviceState = JSON.parse(JSON.stringify(deviceState))
        newDeviceState[function_code] = function_value;
        setDeviceState(newDeviceState)

        if(updateDebounced)
            debouncedSendRequest(device, newDeviceState);
        else
            deviceCt.postDeviceStateMethod(device,newDeviceState)
    }

    function BooleanDeviceFunctionChangeHandler(e){
        const function_code = e.target.getAttribute('function_code')
        const function_value = e.target.checked

        ChangeHandler(function_code, function_value, false)
    }

    function EnumDeviceFunctionChangeHandler(e){
        const function_code = e.target.getAttribute('function_code')
        const function_value = e.target.value

        ChangeHandler(function_code, function_value, false)
    }

    function IntegerDeviceFunctionChangeHandler(e) {
        const function_code = e.target.getAttribute('function_code')
        const function_value = e.target.value

        ChangeHandler(function_code, function_value, true)
    }


    useEffect(() => {
        deviceCt.updateDeviceStateMethod(device,setDeviceState)
    },[])

    // if('cz'==device.category)
    //     console.log(device)


    if( device.status.length === 0 && device.functions.length === 0 ){
        console.log(device.device_id + " is PASSIVE device. do not render");
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
                                {!(device.functions.length > 0) ? <div>no devices in here</div> : device.functions.map(func => {
                                    switch (func.type) {
                                        case "Boolean":
                                            return (
                                                <div className="form-check form-switch"
                                                     key={`${device.device_id}${func.code}`}>
                                                    <input className="form-check-input" type="checkbox" role="switch"
                                                           checked={deviceState[func.code]}
                                                           onChange={BooleanDeviceFunctionChangeHandler}
                                                           function_code={func.code}
                                                    />
                                                    <label className="form-check-label"
                                                           htmlFor={'switch' + func.code}>{func.name}</label>
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
                                                           onChange={IntegerDeviceFunctionChangeHandler}
                                                           function_code={func.code}
                                                           id={`customRange${device.device_id}${func.code}`}
                                                    />
                                                </div>
                                            );
                                            break;
                                        case "Enum":
                                            return (
                                                <div key={`${device.device_id}${func.code}`}>{func.name}
                                                    <select
                                                        value={deviceState[func.code]}
                                                        onChange={EnumDeviceFunctionChangeHandler}
                                                        function_code={func.code}
                                                        className="form-select form-select-sm" aria-label=".form-select-sm example">
                                                        {func.values.range.map((line, index) =>
                                                            <option key={"DeviceCatInputCtSelectorOption"+index} value={line}>{line}</option>
                                                        )}
                                                    </select>
                                                </div>

                                            );
                                            break;
                                        default:
                                            return (<div key={`${device.device_id}${func.code}`}>{func.type} {func.code}</div>);
                                    }
                                })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CommonDevice;