import DeviceCt from "../DeviceCt";
import React from "react";
import DeviceCatInputCt from "./DeviceCatInputCt";

function DefaultDeviceCat({device}) {

    if('cz'==device.category)
        console.log(device)


    if( device.status.length === 0 && device.functions.length === 0 ){
        console.log(device.device_id + " is PASSIVE device. dont render");
    }
    else {
        return (
            <div className={"col m-1 p-0 border bg-light bg-gradient card"}>
                <div className={"card-body"}>
                    <div className={"container"}>
                        <div className="row">
                            <div className="col">
                                <img
                                    src={device.icon_url}
                                    className="rounded float-start img-thumbnail me-2"
                                    alt={device.name}
                                    style={{height: "60px"}}
                                />
                            </div>
                            <div className="col">
                                <h5>{device.name}</h5>
                                <small className="text-muted">
                                    {device.category}
                                </small>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                { (device.functions.length>0)
                                    ?
                                    device.functions.map(f =>
                                        <DeviceCatInputCt key={device.id+'f'+f.code}
                                                          func={f}
                                        />
                                    )
                                    :
                                    <div>nope</div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DefaultDeviceCat;