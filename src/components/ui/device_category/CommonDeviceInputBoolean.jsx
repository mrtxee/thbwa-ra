import React, {useEffect, useRef, useState} from "react";

function CommonDeviceInputBoolean({deviceFunction, initialFunctionState, ChangeHandler}) {
    const [functionState, setFunctionState] = useState(initialFunctionState);

    function deviceFunctionChangeHandler(e){
        const functionValue = e.target.checked

        const newFunctionState = {}
        newFunctionState[deviceFunction.code] = functionValue
        setFunctionState(newFunctionState)
        ChangeHandler(deviceFunction.code, functionValue, false)
    }


    return (
        <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch"
                   checked={functionState[deviceFunction.code]}
                   onChange={deviceFunctionChangeHandler}
                   id={`switch${deviceFunction.code}`}
            />
            <label className="form-check-label"
                   htmlFor={`switch${deviceFunction.code}`}>{deviceFunction.name}</label>
        </div>

    );
}

export default CommonDeviceInputBoolean;