import DeviceCt from "./DeviceCt";
import React from "react";

function RoomCt(props) {
    return (
        <div>
            <div className={"container"}>
                <div className={"row row-cols-2 row-cols-md-3 row-cols-lg-5 g-2"}>
                    {props.room.devices.map(device =>
                        <DeviceCt key={device.device_id}
                                  device={device}
                                  updateDeviceStateMethod={props.updateDeviceStateMethod}
                                  postDeviceStateMethod={props.postDeviceStateMethod}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default RoomCt;