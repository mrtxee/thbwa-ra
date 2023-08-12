import React from "react";
import RoomCt from "./RoomCt";


function HomeCt(props) {
    return (
        <div style={{border: "3px solid #eee", margin: "3px"}}>
            <p>
                {props.home.name}<br/>
                <small className="text-muted">{props.home.geo_name}</small>
            </p>
            {props.home.rooms.map(room =>
                <RoomCt key={room.room_id} room={room}/>
            )}
        </div>

        // <div style={{border: "2px solid #ccc", margin: "2px 0px"}}>
        //     <p>
        //         {props.room.name}
        //     </p>
        //     {props.room.devices.map(device =>
        //         <DeviceCt key={device.uuid}  device={device}/>
        //     )}
        // </div>
    );
}

export default HomeCt;