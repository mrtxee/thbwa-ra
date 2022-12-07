import React, {useEffect, useRef, useState} from 'react';
import {Alert, Button, ButtonGroup, Spinner} from 'reactstrap';
import axios from "axios";
import HomeRoomsTabs from "./components/ui/HomeRoomsTabs";
import HomeSelector from "./components/ui/HomeSelector";


function App() {
    const [homes, setHomes] = useState([]);
    const [currentHomeID, setCurrentHomeID] = useState(0);

    async function fetchHomes() {
        const response = await axios.get('http://127.0.0.1:8001/api/v1.0/get_devices/2')
        setHomes(await response.data.data);
        return true;
    }

    useEffect( () => {
        console.log("mount useEffect happened")
        fetchHomes().then(()=>{
            console.log("fetchHomes then happened");
            console.log(homes);
            console.log("fetchHomes then happened homes[0]");
            console.log(homes[0]);
            console.log("fetchHomes then happened homes[0].home_id");
            //console.log(homes[0].home_id);
            console.log(currentHomeID);
            if (0 == currentHomeID && homes[0].home_id){
                console.log("lets setCurrentHomeID")
                setCurrentHomeID(homes[0].home_id)
            }
        });


    },[])

    function homeChange(home_id){
        console.log('homeChange event says that current home_id is');
        console.log(home_id);
        setCurrentHomeID( Number(home_id) );
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
            <Button color="success" onClick={fetchHomes}>
                get devices
            </Button>
            <HomeSelector
                value={currentHomeID}
                onChange={homeChange}
                homes={homes}
                defaultValue="select home"
            />
            {homes.length > 0 && currentHomeID > 0
                ?
                <HomeRoomsTabs home={homes.filter(h => h.home_id === Number(currentHomeID))[0]}/>
                :
                <div>homes are not loaded yet</div>
            }
        </div>
    );
}

export default App;
