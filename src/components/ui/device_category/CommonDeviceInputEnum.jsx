import React, {useEffect, useRef, useState} from "react";

function CommonDeviceInputEnum({deviceFunction, deviceState, ChangeHandler}) {

    function deviceInputChangeHandler(e){
        const functionValue = e.target.value

        ChangeHandler(deviceFunction.code, functionValue, false)
    }


    return (
        <div>{deviceFunction.name}
            <select
                value={deviceState[deviceFunction.code]}
                onChange={deviceInputChangeHandler}
                className="form-select form-select-sm" aria-label=".form-select-sm example">
                {deviceFunction.values.range.map((line, index) =>
                    <option key={"DeviceCatInputCtSelectorOption"+index} value={line}>{line}</option>
                )}
            </select>
        </div>
    );
}

export default CommonDeviceInputEnum;