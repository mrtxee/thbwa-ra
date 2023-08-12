import newId from "../../utils/newid";

function CommonDeviceInputReadonly({deviceFunction, deviceState}) {
    const thisId = newId();
    if ("" === deviceState[deviceFunction.code])
        deviceState[deviceFunction.code] = "∅"
    return (
        <div className={"row row-cols-2 my-2"}>
            <div className="col text-nowrap">
                <label className="form-label"
                       htmlFor={`${thisId}`}>
                    {deviceFunction.name}
                </label>
            </div>
            <div className="col text-end">
                <span className="badge text-bg-warning text-wrap text-break" style={{maxWidth: "16rem"}}>
                    {deviceState[deviceFunction.code]}
                </span>
            </div>
        </div>
    );
}

export default CommonDeviceInputReadonly;