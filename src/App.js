import React, {useRef, useState} from 'react';
import {Alert, Button, ButtonGroup, Spinner} from 'reactstrap';
import AlertExample from "./components/ui/alert/alert";
import axios from "axios";


function App() {
    const [homes, setHomes] = useState([]);

    async function getDevices() {
        console.log('getDevices called');
        const response = await axios.get('http://localhost:8001/api/v1.0/get_devices/2');
        setHomes(response.data.data)
        console.log(homes[0]);
    }

    const renderDeviceByType = (device) => {
        let color = "red"
        switch(device.category) {
            case 'tgq':
                color = "blue"
                break
        }

        return (<li  style={{color: color}} key={device.uuid}>
                {
                    device.name
                }
            </li>
        )
    }

    // const alertRef = useRef();
    // let isAlertExampleVisible = true;
    // const onLoadHomesClick = function () {
    //     console.log('onLoadHomesClick');
    //     getDevicesLine().then(r => {
    //         console.log('r is ok');
    //     });
    //     toggleAlert();
    // }
    // const [visible, setVisible] = useState(true);
    // const toggleAlert = function () {
    //     if (visible)
    //         setVisible(false);
    //     else setVisible(true);
    // }
    return (
        <div>
            <Button color="success" onClick={getDevices}>
                get devices
            </Button>

            <div>
                {homes.map(home =>
                    <div key={home.home_id} style={{border: "3px solid #eee", margin: "3px"}}>
                        <p>
                            {home.name}<br/>
                            <small className="text-muted">{home.geo_name}</small>
                        </p>
                        {home.rooms.map(room =>
                            <div key={room.room_id} style={{border: "2px solid #ccc", margin: "2px 0px"}}>
                                <p>
                                    {room.name}
                                </p>
                                {room.devices.map(device =>
                                    <div key={device.uuid} style={{border: "1px solid #aaa", margin: "1px 0px"}}>
                                        <img
                                            src={device.icon_url}
                                            className="rounded float-start"
                                            alt={device.name}
                                            style={{height: "60px"}}
                                        />
                                        <p>
                                            {device.name}<br/>
                                            <small className="text-muted">
                                                {device.category}<br/>
                                            </small>
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>


            {/*<Button color="warning" onClick={getDevicesLine}>*/}
            {/*    get devices line*/}
            {/*</Button>*/}
            {/*<div>*/}
            {/*    {homes.map(home =>*/}
            {/*        <div key={home.home_id}>*/}
            {/*            <p>{home.name}</p>*/}
            {/*            <ul>*/}
            {/*                {*/}
            {/*                    rooms.filter(r => r.home_id === home.home_id).map(room => <li key={room.room_id}>*/}
            {/*                        {room.name}*/}
            {/*                        <ul>*/}
            {/*                            {*/}
            {/*                                devices.filter(d => d.room_id === room.room_id).map(device =>*/}
            {/*                                    renderDeviceByType(device)*/}
            {/*                                )*/}
            {/*                            }*/}
            {/*                        </ul>*/}
            {/*                    </li>)*/}
            {/*                }*/}
            {/*            </ul>*/}

            {/*        </div>*/}
            {/*    )}*/}
            {/*</div>*/}
        </div>


        // <AlertExample
        //     color="success"
        //     visible={visible}
        //     toggleAlert={toggleAlert}
        //     msg="lorem ipsum"
        // />
        // <div>
        //     <AlertExample
        //         color="success"
        //         visible = {visible}
        //         toggleAlert = {toggleAlert}
        //         msg = "lorem ipsum"
        //     />
        //     <p ref={alertRef}>the stuff is here</p>
        //     <p>кнопки управления</p>
        //     <ButtonGroup>
        //         <Button color="warning" onClick={}>
        //             test
        //         </Button>
        //         <Button color="warning" onClick={onLoadHomesClick}>
        //             load homes
        //         </Button>
        //         <Button color="warning">
        //             load rooms
        //         </Button>
        //         <Button color="warning">
        //             load rooms devices
        //         </Button>
        //         <Button color="warning">
        //             load all
        //         </Button>
        //     </ButtonGroup>
        //     <p>лоадер</p>
        //     <Spinner color="info">
        //         Loading...
        //     </Spinner>
        //     <p>сообщения: данныне успешно загружены, ошибка</p>
        //     <Alert color="warning" isOpen={visible} toggle={toggleAlert}>
        //         hello
        //     </Alert>
        //     <p>список элементов пока линейный</p>
        //     <div>
        //         {homes.map(e => <span>e.home_id</span>)}
        //     </div>
        // </div>
    );
}

export default App;
