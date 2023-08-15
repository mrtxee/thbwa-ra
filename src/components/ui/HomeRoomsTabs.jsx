import React from 'react';
import RoomCt from "./RoomCt";

const HomeRoomsTabs = ({home, activeTabIndex, ...props}) => {
    //console.log(home.rooms.length);

    return (
        <div className={"container-fluid m-0 p-0"}>
            {home && home.rooms && home.rooms.length
                ?
                <div>
                    {home.rooms.length > 1 &&
                        <ul className="nav nav-pills mb-1" id="pills-tab" role="tablist">
                            {home.rooms && home.rooms.map((room, index) =>
                                <li className="nav-item" role="presentation" key={"li" + room.room_id}>
                                    <button type="button" role="tab" data-bs-toggle="pill"
                                            className={`nav-link${index === activeTabIndex ? ' active' : ''}`}
                                            aria-selected={index === activeTabIndex}
                                            id={"pills-" + room.room_id + "-tab"}
                                            data-bs-target={"#pills-" + room.room_id}
                                            aria-controls={"pills-" + room.room_id}
                                    >{room.name}
                                    </button>
                                </li>
                            )}
                        </ul>
                    }

                    <div className="tab-content" id="pills-tabContent">
                        {home.rooms.map((room, index) =>
                            // <div className="tab-pane fade show active">...</div>

                            <div role="tabpanel"
                                 key={"keypills-" + room.room_id}
                                 className={` tab-pane fade${index === activeTabIndex ? ' show active' : ''}`}
                                 tabIndex={index}
                                 id={"pills-" + room.room_id}
                                 aria-labelledby={"pills-" + room.room_id + "-tab"}
                            >
                                <RoomCt key={room.room_id}
                                        room={room}
                                        updateDeviceStateMethod={props.updateDeviceStateMethod}
                                        postDeviceStateMethod={props.postDeviceStateMethod}
                                        sendRCCMethod={props.sendRCCMethod}
                                />
                            </div>
                        )}
                    </div>
                </div>
                :
                <div>rooms are not presented yet</div>
            }
        </div>
    );
};

export default HomeRoomsTabs;