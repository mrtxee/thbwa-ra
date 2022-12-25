import React, {useEffect, useRef, useState} from "react";
import { debounce } from "lodash"
import CommonDeviceInputEnum from "./CommonDeviceInputEnum";
import CommonDeviceInputBoolean from "./CommonDeviceInputBoolean";
import CommonDeviceInputInteger from "./CommonDeviceInputInteger";
import CommonDeviceInputReadonly from "./CommonDeviceInputReadonly";
import CommonDeviceInputJson from "./CommonDeviceInputJson";
import newId from "../../utils/newid";

function CommonDevice({device, updateDeviceStateMethod, postDeviceStateMethod}) {

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
    })
    const [deviceState, setDeviceState] = useState(initialDeviceState);
    const debouncedPostDeviceStateMethod = useRef(debounce(postDeviceStateMethod, 2000)).current

    useEffect(() => {
        // COUNSTRUCTOR
        updateDeviceStateMethod(device,setDeviceState)
    },[])

    function ChangeHandler(functionCode, functionValue, updateDebounced){
        console.log(`switchStateChange ${functionCode} is ${functionValue} for ${device.device_id}`)
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
                break;
            case "Boolean":
                return (
                    <CommonDeviceInputBoolean key={`${device.device_id}${deviceFunction.code}`}
                                              deviceFunction= {deviceFunction}
                                              deviceState = {deviceState}
                                              ChangeHandler = {ChangeHandler}
                    />
                );
                break;
            case "Integer":
                return (
                    <CommonDeviceInputInteger key={`${device.device_id}${deviceFunction.code}`}
                                              deviceFunction= {deviceFunction}
                                              deviceState = {deviceState}
                                              ChangeHandler = {ChangeHandler}
                    />
                );
                break;
            case "Readonly":
                return (
                    <CommonDeviceInputReadonly key={`${device.device_id}${deviceFunction.code}`}
                                               deviceFunction= {deviceFunction}
                                               deviceState = {deviceState}
                    />
                );
                break;
            case "String":
            case "Json":
                return (
                    <CommonDeviceInputJson key={`${device.device_id}${deviceFunction.code}`}
                                           deviceFunction= {deviceFunction}
                                           deviceState = {deviceState}
                                           ChangeHandler = {ChangeHandler}
                    />
                );
                break;
            default:
                return (<div key={`${device.device_id}${deviceFunction.code}`}>{deviceFunction.type} {deviceFunction.code}</div>);
        }
    }
    // if('bf187ac579468e9f1cgyco'==device.device_id){
    //     device['card_functions'] = device['functions'].filter(f => f.type === "Boolean" || f.type === "Integer").slice(0, maxObjInCard);
    // }
    if( device.status.length === 0 && device.functions.length === 0 ){
        console.log(device.device_id + " is PASSIVE device. do not render");
    }
     else{
        const thisId = newId();
        device['card_functions'] = device['functions'].filter(f => f.type === "Boolean" || f.type === "Integer" || f.type === "Readonly").slice(0, maxObjInCard);
        return (
            <div className={"col"}>
                <div className={"card border bg-light bg-gradient"} style={{minHeight: '280px'}}>
                    <div className={"card-body"}>
                        <div className="d-flex align-items-center">
                            <div className="flex-shrink-0">
                                <img
                                    src={device.icon_url}
                                    className="rounded float-start img-thumbnail me-2 p-0"
                                    alt={device.name}
                                    style={{maxHeight: "68px"}}
                                />
                            </div>
                            <div className="flex-grow-1">
                                <h5 className={"text-break"}>{device.name}</h5>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                {!(device['card_functions'].length > 0) ? <div>no devices in here</div> : device['card_functions'].map(deviceFunction => {
                                        return getFunctionInput(deviceFunction);
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="card-footer bg-transparent border-transparent">
                        <button type="button" className="btn btn-outline-primary w-100" data-bs-toggle="modal" data-bs-target={`#${thisId}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-gear" viewBox="0 0 16 16">
                                <path
                                    d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                                <path
                                    d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                            </svg> more
                            <span className="visually-hidden">Button</span>
                        </button>
                    </div>
                </div>
                <div className="modal fade" id={`${thisId}`} tabIndex="-1" aria-labelledby={`${thisId}Label`}
                     aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                {/*<div className="d-flex align-items-center">*/}
                                {/*    <div className="flex-shrink-0">*/}
                                {/*        <img*/}
                                {/*            src={device.icon_url}*/}
                                {/*            className="rounded float-start img-thumbnail"*/}
                                {/*            alt={device.name}*/}
                                {/*            style={{maxHeight: "32px"}}*/}
                                {/*        />*/}
                                {/*    </div>*/}
                                {/*    <div className="flex-grow-1 ms-1">*/}
                                {/*        <h5 className={"text-break"}>{device.name}</h5>*/}
                                {/*    </div>*/}
                                {/*</div>*/}

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
                                {!(device.functions.length > 0) ? <div>no devices in here</div> : device.functions.map(deviceFunction => {
                                        return getFunctionInput(deviceFunction);
                                    })
                                }
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