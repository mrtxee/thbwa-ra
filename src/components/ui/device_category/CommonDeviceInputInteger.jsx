import newId from '../../utils/newid';

function CommonDeviceInputInteger({deviceFunction, deviceState, ChangeHandler}) {

    const thisId = newId();
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
                    <span className="badge text-bg-light text-wrap p-0">
                        {deviceState[deviceFunction.code]}
                    </span>
                </div>
            </div>
            <div className={"row my-2"}>
                <div className={"col"}>
                    <input type="range" className="form-range"
                           min={deviceFunction.values.min}
                           max={deviceFunction.values.max}
                           step={deviceFunction.values.step}
                           value={deviceState[deviceFunction.code]}
                           onChange={e => {ChangeHandler(deviceFunction.code, Number(e.target.value), true)}}
                           id={`${thisId}`}
                    />
                </div>
            </div>
        </div>
    );
}

export default CommonDeviceInputInteger;