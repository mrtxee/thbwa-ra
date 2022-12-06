import React from 'react';
import RoomCt from "./RoomCt";

const HomeRoomsTabs = (props) => {
    console.log('HomeRoomsTabs props:');
    console.log(props);
    return (
        <div>
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                {props.home.rooms && props.home.rooms.map(room =>
                    // <RoomCt key={room.room_id}  room={room}/>
                    <li className="nav-item" role="presentation" key={"li"+room.room_id}>
                        <button className="nav-link"
                                id={"pills-"+room.room_id+"-tab"}
                                data-bs-target={"#pills-"+room.room_id}
                                aria-controls={"pills-"+room.room_id}
                                data-bs-toggle="pill"
                        type="button" role="tab" aria-selected="false">{room.name}
                        </button>
                    </li>
                )}
            </ul>
            <div className="tab-content" id="pills-tabContent">
                {props.home.rooms && props.home.rooms.map(room =>
                    <div className="tab-pane fade"
                         key={"keypills-"+room.room_id}
                         id={"pills-"+room.room_id}
                         aria-labelledby={"pills-"+room.room_id+"-tab"}
                         role="tabpanel">
                        {/*{room.name}*/}
                        <RoomCt key={room.room_id}  room={room}/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomeRoomsTabs;