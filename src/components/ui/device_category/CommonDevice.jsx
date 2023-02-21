import React, {useEffect, useRef, useState} from "react";
import { debounce } from "lodash"
import CommonDeviceInputEnum from "./CommonDeviceInputEnum";
import CommonDeviceInputBoolean from "./CommonDeviceInputBoolean";
import CommonDeviceInputInteger from "./CommonDeviceInputInteger";
import CommonDeviceInputReadonly from "./CommonDeviceInputReadonly";
import CommonDeviceInputJson from "./CommonDeviceInputJson";
import newId from "../../utils/newid";

function CommonDevice({device, updateDeviceStateMethod, postDeviceStateMethod, sendRCCMethod}) {
    const maxObjInCard = 2;
    const initialDeviceState = {}
    device.functions.map(deviceFunction => {
        switch (deviceFunction.type){
            case "Integer":
                initialDeviceState[deviceFunction.code] = deviceFunction.values.min
                break;
            case "Boolean":
                initialDeviceState[deviceFunction.code] = false;
                break;
            case "Enum":
                initialDeviceState[deviceFunction.code] = deviceFunction.values.range[0];
                break;
            case "String":
                initialDeviceState[deviceFunction.code] = 'String';
                break;
            case "Readonly":
                initialDeviceState[deviceFunction.code] = 'Readonly';
                break;
            case "Json":
                initialDeviceState[deviceFunction.code] = 'Readonly';
                break;
            default:
                console.log('unknown device function value type '+deviceFunction.type)
        }
        return true;
    })
    const [deviceState, setDeviceState] = useState(initialDeviceState);
    const debouncedPostDeviceStateMethod = useRef(debounce(postDeviceStateMethod, 2000)).current
    //const debouncedPostDeviceStateMethod = useRef(debounce(postDeviceStateMethod, 2000)).current

    useEffect(() => {
        updateDeviceStateMethod(device,setDeviceState)
    },[])

    function ChangeHandler(functionCode, functionValue, updateDebounced){
        //console.log(`switchStateChange ${functionCode} is ${functionValue} for ${device.device_id}`)
        const newDeviceState = JSON.parse(JSON.stringify(deviceState))
        newDeviceState[functionCode] = functionValue;
        setDeviceState(newDeviceState)

        const newDeviceStatePost = {}
        newDeviceStatePost[functionCode] = functionValue;

        if(updateDebounced){
            debouncedPostDeviceStateMethod(device, newDeviceStatePost);
        }
        else
            postDeviceStateMethod(device,newDeviceStatePost)
    }

    function getFunctionInput(deviceFunction){
        switch (deviceFunction.type) {
            case "Enum":
                return (
                    <CommonDeviceInputEnum key={`${device.device_id}${deviceFunction.code}`}
                                           deviceFunction= {deviceFunction}
                                           deviceState = {deviceState}
                                           ChangeHandler = {ChangeHandler}
                    />
                );
            case "Boolean":
                return (
                    <CommonDeviceInputBoolean key={`${device.device_id}${deviceFunction.code}`}
                                              deviceFunction= {deviceFunction}
                                              deviceState = {deviceState}
                                              ChangeHandler = {ChangeHandler}
                    />
                );
            case "Integer":
                return (
                    <CommonDeviceInputInteger key={`${device.device_id}${deviceFunction.code}`}
                                              deviceFunction= {deviceFunction}
                                              deviceState = {deviceState}
                                              ChangeHandler = {ChangeHandler}
                    />
                );
            case "Readonly":
                return (
                    <CommonDeviceInputReadonly key={`${device.device_id}${deviceFunction.code}`}
                                               deviceFunction= {deviceFunction}
                                               deviceState = {deviceState}
                    />
                );
            case "String":
            case "Json":
                return (
                    <CommonDeviceInputJson key={`${device.device_id}${deviceFunction.code}`}
                                           deviceFunction= {deviceFunction}
                                           deviceState = {deviceState}
                                           ChangeHandler = {ChangeHandler}
                    />
                );
            default:
                return (<div key={`${device.device_id}${deviceFunction.code}`}>{deviceFunction.type} {deviceFunction.code}</div>);
        }
    }

    if( device.status.length === 0 && device.functions.length === 0 ){
        console.log(device.device_id + " is PASSIVE device. do not render");
    }
     else{
        const thisId = newId();
        device['card_functions'] = device['functions'].filter(f => f.type === "Boolean" || f.type === "Integer" || f.type === "Readonly").slice(0, maxObjInCard);
        return (
            <div>
                <div className={"card bg-light bg-gradient"} style={{minHeight: '270px'}}>
                    <div className={"card-body"}>
                        <div className="d-flex">
                            <div className="flex-shrink-0">
                                <img
                                    src={device.icon_url}
                                    className="rounded img-thumbnail p-0"
                                    alt={device.name}
                                    style={{maxHeight: "48px"}}
                                />
                            </div>
                            <div className="flex-grow-1 ms-2">
                                <h5 className={"text-break"}>{device.name}</h5>
                            </div>
                        </div>

                        <div className="row mt-2">
                            {device['card_functions'] &&(
                            <div className="col">
                                {device['card_functions'].map(deviceFunction => {
                                        return getFunctionInput(deviceFunction);
                                    })
                                }
                            </div>
                            )}
                        </div>
                        {device['remote'] &&(
                        <div className="row row-cols-3 m-1">
                            {device['remote']['key_list'].slice(0, 9).map(btn => {
                                return(
                                    <div className={'col p-1'} key={`1${btn.key}`}>
                                        <button type="button"
                                                alt={btn.key}
                                                className="btn btn-outline-dark btn-info btn-sm w-100 h-100"
                                                onClick={e => {
                                                    sendRCCMethod(device['remote']['parent_id'], device['device_id'], device['remote']['category_id']
                                                        , device['remote']['remote_index'], btn.key, btn.key_id)
                                                }}
                                        >
                                            {btn.key_name}
                                        </button>
                                    </div>
                                )
                            })
                            }
                        </div>
                        )}
                    </div>
                    <div className="card-footer bg-transparent border-transparent">
                        <button type="button" className="btn btn-outline-primary w-100" data-bs-toggle="modal" data-bs-target={`#${thisId}`}>
                            <i className="bi bi-gear"></i> more
                        </button>
                    </div>
                </div>
                <div className="modal fade" id={`${thisId}`} tabIndex="-1" aria-labelledby={`${thisId}Label`}
                     aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title " id={`${thisId}Label`}>
                                    <img
                                        src={device.icon_url}
                                        className="rounded float-start img-thumbnail me-2 p-0"
                                        alt={device.name}
                                        style={{maxHeight: "32px"}}
                                    />
                                    {device.name}
                                </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {(device.functions.length > 0) &&(
                                    <div className="col">
                                        {device.functions.map(deviceFunction => {
                                            return getFunctionInput(deviceFunction);
                                        })
                                        }
                                    </div>
                                )}
                                {device['remote'] &&(
                                    <div className="row row-cols-3 m-1">
                                    {device['remote']['key_list'].map(btn => {
                                        return(
                                            <div className={'col p-1'} key={`2${btn.key}`}>
                                                <button type="button"
                                                    alt={btn.key}
                                                    className="btn btn-outline-dark btn-info btn-lg w-100 h-100"
                                                    onClick={e => {
                                                        sendRCCMethod(device['remote']['parent_id'], device['device_id'], device['remote']['category_id']
                                                            , device['remote']['remote_index'], btn.key, btn.key_id)
                                                    }}
                                                >{btn.key_name}
                                                </button>
                                            </div>
                                        )
                                    })}
                                    </div>
                                )}
                            </div>

                            <div className="modal-footer">
                                <small className="text-muted">
                                    {device.category}.{device.product_id}.{device.device_id}
                                </small>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default CommonDevice;