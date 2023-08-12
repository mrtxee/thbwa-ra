import DeviceCt from "./DeviceCt";
import React from "react";

function RoomCt(props) {
    return (
        <div>
            <div className={"container px-0"}>
                <div
                    className={"row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5  row-cols-xxl-5 g-2"}>
                    {props.room.devices.map(device =>
                        <DeviceCt key={device.device_id}
                                  device={device}
                                  updateDeviceStateMethod={props.updateDeviceStateMethod}
                                  postDeviceStateMethod={props.postDeviceStateMethod}
                                  sendRCCMethod={props.sendRCCMethod}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default RoomCt;