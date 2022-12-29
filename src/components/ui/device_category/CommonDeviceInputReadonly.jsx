import newId from "../../utils/newid";

function CommonDeviceInputReadonly({deviceFunction, deviceState}) {
    const thisId = newId();
    if(""===deviceState[deviceFunction.code])
        deviceState[deviceFunction.code]="∅"
    return (
        <div className={"row my-2"}>
            <div className="col-6">
                <label className="form-label"
                       htmlFor={`${thisId}`}>
                    {deviceFunction.name}
                </label>
            </div>
            <div className="col-6 text-end">
                <div className="badge text-bg-warning text-wrap text-break" style={{maxWidth: "16rem"}}>
                    {deviceState[deviceFunction.code]}
                </div>
            </div>
        </div>
    );
}

export default CommonDeviceInputReadonly;