import React, {useEffect, useRef, useState} from "react";
import newId from '../../utils/newid';

function CommonDeviceInputBoolean({deviceFunction, deviceState, ChangeHandler}) {

    function deviceInputChangeHandler(e){
        const functionValue = e.target.checked

        ChangeHandler(deviceFunction.code, functionValue, false)
    }
    const thisId = newId();

    return (
        <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch"
                   checked={deviceState[deviceFunction.code]}
                   onChange={deviceInputChangeHandler}
                   id={`${thisId}`}
            />
            <label className="form-check-label"
                   htmlFor={`${thisId}`}>{deviceFunction.name}</label>
        </div>

    );
}

export default CommonDeviceInputBoolean;