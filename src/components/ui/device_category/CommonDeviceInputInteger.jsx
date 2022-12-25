import React, {useEffect, useRef, useState} from "react";
import newId from '../../utils/newid';

function CommonDeviceInputInteger({deviceFunction, deviceState, ChangeHandler}) {

    const thisId = newId();
    return (
        <div className={"my-2"}>
            <div className="float-start">
                <label className="form-label"
                       htmlFor={`${thisId}`}>
                    {deviceFunction.name}
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
                   onChange={e => {ChangeHandler(deviceFunction.code, Number(e.target.value), true)}}
                   id={`${thisId}`}
            />
        </div>
    );
}

export default CommonDeviceInputInteger;