import {useId} from "react";

function CommonDeviceInputBoolean({deviceFunction, deviceState, ChangeHandler}) {
    const thisId = useId();
    return (

        <div>
            <div className="form-check form-switch p-0">
                <label className="form-check-label float-start text-nowrap"
                       htmlFor={`${thisId}`}>{deviceFunction.name}</label>
                <input className="form-check-input float-end" type="checkbox" role="switch"
                       checked={deviceState[deviceFunction.code]}
                       onChange={e => {
                           ChangeHandler(deviceFunction.code, e.target.checked, false)
                       }}
                       id={`${thisId}`}
                />

            </div>
        </div>

    );
}

export default CommonDeviceInputBoolean;