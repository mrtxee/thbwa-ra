import {useId} from "react";

function CommonDeviceInputInteger({deviceFunction, deviceState, ChangeHandler}) {

    const thisId = useId();
    return (
        <div>
            <div className={"row row-cols-2 my-2"}>
                <div className="col text-nowrap">
                    <label className="form-label"
                           htmlFor={`${thisId}`}>
                        {deviceFunction.name}
                    </label>
                </div>
                <div className="col text-end">
                    <small className="fw-semibold text-wrap p-0">
                        {deviceState[deviceFunction.code]}
                    </small>
                </div>
            </div>
            <div className={"row my-2"}>
                <div className={"col"}>
                    <input type="range" className="form-range bg-body-info"
                           min={deviceFunction.values.min}
                           max={deviceFunction.values.max}
                           step={deviceFunction.values.step}
                           value={deviceState[deviceFunction.code]}
                           onChange={e => {
                               ChangeHandler(deviceFunction.code, Number(e.target.value), true)
                           }}
                           id={`${thisId}`}
                    />
                </div>
            </div>
        </div>
    );
}

export default CommonDeviceInputInteger;