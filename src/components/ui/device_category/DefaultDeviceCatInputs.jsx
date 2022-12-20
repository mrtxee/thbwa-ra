import Dj from "./Dj";
import CommonDevice from "./CommonDevice";
import React, {useState} from "react";

function DefaultDeviceCatInputs({func, device_id, deviceState, setDeviceState}) {

    if('53436805c44f33b7cadc'==device_id && func.type == "Boolean") {
        console.log(deviceState)
        console.log(deviceState[func.code])
    }

    function switchStateChange(e){
        console.log(`switchStateChange switch_led is ${e.target.checked} for ${device_id}`)
        const newDeviceState = {...deviceState, "switch_led": e.target.checked}
        setDeviceState(newDeviceState)
        // deviceCt.postDeviceStateMethod(device,newDeviceState)
    }

    switch (func.type) {
        case "Boolean":
            return (
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch"
                        checked={deviceState[func.code]}
                        onChange={switchStateChange}
                    />
                    <label className="form-check-label" htmlFor={'switch'+func.code}>{func.name}</label>
                </div>
            );
            break;
        case "Integer":
            return (
                <div>
                    <label htmlFor="customRange3" className="form-label">{func.name}</label>
                    <input type="range" className="form-range" min={func.values.min} max={func.values.max} step={func.values.step} id={'switch'+func.code}/>
                </div>
            );
        case "Enum":
            return (
                <div>{func.name}
                    <select
                        // value={value}
                        // onChange={e => onChange( e.target.value )}
                        className="form-select form-select-sm" aria-label=".form-select-sm example">
                        {func.values.range.map((line, index) =>
                            <option key={"DeviceCatInputCtSelectorOption"+index} value={line}>{line}</option>
                        )}
                    </select>
                </div>
            );
        case "String":
            return (
                <div>️🖊️{func.code}</div>
            );
        case "Readonly":
            return (
                <div>️👁️️{func.code}</div>
            );
        default:
            return (
                <div>{func.code}</div>
            );
            break;
    }
}

export default DefaultDeviceCatInputs;