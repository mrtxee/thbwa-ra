import DeviceCt from "./DeviceCt";
import React from "react";

function RoomCt(props) {
    return (
        <div style={{border: "2px solid #ccc", margin: "2px 0px"}}>
            <p>
                {props.room.name}
            </p>
            {props.room.devices.map(device =>
                <DeviceCt key={device.uuid}  device={device}/>
            )}
        </div>
    );
}

export default RoomCt;