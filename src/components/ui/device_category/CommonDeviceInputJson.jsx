import React, {useEffect, useRef, useState} from "react";
import newId from '../../utils/newid';

function CommonDeviceInputJson({deviceFunction, deviceState, ChangeHandler}) {

    function deviceInputChangeHandler(e){
        const functionValue = e.target.value
        console.log(functionValue);
        ChangeHandler(deviceFunction.code, functionValue, true)
    }
    const thisId = newId();

    return (
        <div className="form-floating my-2">
            <textarea className="form-control" placeholder={deviceFunction.name}
                      id={`${thisId}`}
                      onChange={deviceInputChangeHandler}
                      value={deviceState[deviceFunction.code]}
            ></textarea>
            <label htmlFor={`${thisId}`}>{deviceFunction.name}</label>
        </div>
    );
}

export default CommonDeviceInputJson;