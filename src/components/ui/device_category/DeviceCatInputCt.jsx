import Dj from "./Dj";
import DefaultDeviceCat from "./DefaultDeviceCat";
import React from "react";

function DeviceCatInputCt({func}) {

    switch (func.type) {
        case "Boolean":
            return (
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id={'switch'+func.code}
                           // checked={deviceState.switch_led}
                           // onChange={switchStateChange}
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

export default DeviceCatInputCt;