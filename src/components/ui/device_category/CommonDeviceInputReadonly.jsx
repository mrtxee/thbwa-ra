import React, {useEffect, useRef, useState} from "react";

function CommonDeviceInputReadonly({deviceFunction, deviceState, ChangeHandler}) {
    return (
        <div>
            <p className="h6">{deviceState[deviceFunction.code]}
                <small className="text-muted"> {deviceFunction.name}</small>
            </p>
        </div>
    );
}

export default CommonDeviceInputReadonly;