import React, {useEffect, useRef, useState} from "react";

function CommonDeviceInputInteger({deviceFunction, initialFunctionState, ChangeHandler}) {
    const [functionState, setFunctionState] = useState(initialFunctionState);

    function deviceFunctionChangeHandler(e){
        const functionValue = Number(e.target.value)

        const newFunctionState = {}
        newFunctionState[deviceFunction.code] = functionValue
        setFunctionState(newFunctionState)
        ChangeHandler(deviceFunction.code, functionValue, false)
    }


    return (
        <div>
            <label className="form-label"
                   htmlFor={`customRange${deviceFunction.code}`}>
                {deviceFunction.name}
            </label>
            <input type="range" className="form-range"
                   min={deviceFunction.values.min}
                   max={deviceFunction.values.max}
                   step={deviceFunction.values.step}
                   value={functionState[deviceFunction.code]}
                   onChange={deviceFunctionChangeHandler}
                   function_code={deviceFunction.code}
                   id={`customRange${deviceFunction.code}`}
            />
        </div>
    );
}

export default CommonDeviceInputInteger;