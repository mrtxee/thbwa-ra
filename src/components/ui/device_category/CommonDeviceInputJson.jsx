import {useId} from "react";

function CommonDeviceInputJson({deviceFunction, deviceState, ChangeHandler}) {

    const thisId = useId();
    return (
        <div className={"row my-2"}>
            <div className="col-12">{deviceFunction.name}</div>
            <div className="col-12 form-floating my-1">

                <textarea className="form-control"
                          style={{height: "160px"}}
                          placeholder={deviceFunction.name}
                          id={`${thisId}`}
                          onChange={e => {
                              ChangeHandler(deviceFunction.code, e.target.value, true)
                          }}
                          value={deviceState[deviceFunction.code]}
                ></textarea>
                <label htmlFor={`${thisId}`}>{deviceFunction.name}</label>
            </div>
        </div>
    );
}

export default CommonDeviceInputJson;