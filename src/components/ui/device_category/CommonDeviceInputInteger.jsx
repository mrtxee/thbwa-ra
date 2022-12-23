import React, {useEffect, useRef, useState} from "react";
import newId from '../../utils/newid';

function CommonDeviceInputInteger({deviceFunction, deviceState, ChangeHandler}) {

    function deviceInputChangeHandler(e){
        const functionValue = Number(e.target.value)
        ChangeHandler(deviceFunction.code, functionValue, true)
    }
    const thisId = newId();

    return (
        <div>
            <div className="float-start">
                <label className="form-label"
                       htmlFor={`${thisId}`}>
                    {deviceFunction.name}:
                </label>
            </div>
            <div className="float-end">
                <span className="badge text-bg-light">
                    {deviceState[deviceFunction.code]}
                </span>
            </div>

            <input type="range" className="form-range"
                   min={deviceFunction.values.min}
                   max={deviceFunction.values.max}
                   step={deviceFunction.values.step}
                   value={deviceState[deviceFunction.code]}
                   onChange={deviceInputChangeHandler}
                   id={`${thisId}`}
            />
        </div>
    );
}

export default CommonDeviceInputInteger;