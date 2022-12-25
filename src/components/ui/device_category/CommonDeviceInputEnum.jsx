import React, {useEffect, useRef, useState} from "react";

function CommonDeviceInputEnum({deviceFunction, deviceState, ChangeHandler}) {

     return (
        <div className={"my-2 mb-3"}>{deviceFunction.name}
            <select
                value={deviceState[deviceFunction.code]}
                onChange={e => {ChangeHandler(deviceFunction.code, e.target.value, false)}}
                className="form-select mt-1" aria-label="chose enum">
                {deviceFunction.values.range.map((line, index) =>
                    <option key={"DeviceCatInputCtSelectorOption"+index} value={line}>{line}</option>
                )}
            </select>
        </div>
    );
}

export default CommonDeviceInputEnum;