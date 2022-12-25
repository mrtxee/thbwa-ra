import React, {useEffect, useRef, useState} from "react";
import newId from '../../utils/newid';

function CommonDeviceInputBoolean({deviceFunction, deviceState, ChangeHandler}) {

    const thisId = newId();
    return (
        <div className="form-check form-switch my-2">
            <input className="form-check-input" type="checkbox" role="switch"
                   checked={deviceState[deviceFunction.code]}
                   onChange={e => {ChangeHandler(deviceFunction.code, e.target.checked, false)}}
                   id={`${thisId}`}
            />
            <label className="form-check-label"
                   htmlFor={`${thisId}`}>{deviceFunction.name}</label>
        </div>

    );
}

export default CommonDeviceInputBoolean;