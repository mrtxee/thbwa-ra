import React, {useRef, useState} from 'react';
import {Alert, Button, ButtonGroup, Spinner} from 'reactstrap';
import axios from "axios";
import HomeRoomsTabs from "./components/ui/HomeRoomsTabs";


function App() {
    const [homes, setHomes] = useState([]);
    const [cur_home, setRooms] = useState([]);

    //const [homes1, setHomes1] = useState([]);

    async function getDevices() {
        console.log('getDevices called');
        const response = await axios.get('http://localhost:8001/api/v1.0/get_devices/2');
        setHomes(response.data.data);
        //setHomes(homes[0]);
        console.log(homes[0]);
    }
    function homeChange(e){
        console.log('homeChange event says that current home_id is');
        console.log(e.target.value);
        console.log(homes);
        console.log(
            homes.filter( h => h.home_id === Number(e.target.value) )
        )
        setRooms(homes.filter( h => h.home_id === Number(e.target.value))[0] );

    }

    // const renderDeviceByType = (device) => {
    //     let color = "red"
    //     switch(device.category) {
    //         case 'tgq':
    //             color = "blue"
    //             break
    //     }
    //
    //     return (<li  style={{color: color}} key={device.uuid}>
    //             {
    //                 device.name
    //             }
    //         </li>
    //     )
    // }

    return (
        <div>
            <Button color="success" onClick={getDevices}>
                get devices
            </Button>
            <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" onChange={homeChange}>
                <option defaultValue>select home</option>
                {homes.map(home =>
                    <option key={"option"+home.home_id} value={home.home_id}>{home.name}</option>
                )}
            </select>
            <HomeRoomsTabs home={cur_home}/>
            {/*<RoomsTabsTesting key={'RoomsTabContainer'} rooms={rooms} />*/}
            {/*<HomesTabsTesting key={'HomesTabContainer'} homes={homes} />*/}
            {/*<div>*/}
            {/*    {homes.map(home =>*/}
            {/*        <HomeCt key={home.home_id} home={home}/>*/}
            {/*    )}*/}
            {/*</div>*/}
        </div>

    );
}

export default App;
