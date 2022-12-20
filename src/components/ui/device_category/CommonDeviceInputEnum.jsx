import React, {useEffect, useRef, useState} from "react";

function CommonDeviceInputEnum({deviceFunction, initialFunctionState, ChangeHandler}) {
    const [functionState, setFunctionState] = useState(initialFunctionState);

    function deviceFunctionChangeHandler(e){
        const functionValue = e.target.value

        const newFunctionState = {}
        newFunctionState[deviceFunction.code] = functionValue
        setFunctionState(newFunctionState)
        ChangeHandler(deviceFunction.code, functionValue, false)
    }


    return (
        <div>{deviceFunction.name}
            <select
                value={functionState[deviceFunction.code]}
                onChange={deviceFunctionChangeHandler}
                className="form-select form-select-sm" aria-label=".form-select-sm example">
                {deviceFunction.values.range.map((line, index) =>
                    <option key={"DeviceCatInputCtSelectorOption"+index} value={line}>{line}</option>
                )}
            </select>
        </div>
    );
}

export default CommonDeviceInputEnum;