import DeviceCt from "./DeviceCt";
import React from "react";

function RoomCt(props) {
    return (
        <div>
            <div className="p-2 bg-warning bg-opacity-10 border border-warning">
                {props.room.name}
            </div>
            <div className={"container"}>
                <div className={"row row-cols-lg-5 row-cols-md-4 row-cols-sm-3 row-cols-2 row-cols-xs-2"}>
                    {props.room.devices.map(device =>
                        <DeviceCt key={device.device_id}
                                  device={device}
                                  passToChild = {props.passToChild}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default RoomCt;