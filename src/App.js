import React, {useEffect, useRef, useState} from 'react';
import {Alert, Button, ButtonGroup, Spinner} from 'reactstrap';
import axios from "axios";
import HomeRoomsTabs from "./components/ui/HomeRoomsTabs";
import HomeSelector from "./components/ui/HomeSelector";
import {ToastContainer} from "react-toastify";


function App() {
    const [homes, setHomes] = useState([]);
    const [currentHomeID, setCurrentHomeID] = useState(0);

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

    function fetchHomes() {
        const loadData = (async () => {
            const response = await axios.get('http://127.0.0.1:8000/api/v1.0/get_devices/2')
            return response.data.data
        })
        loadData().then(data => {
            setTimeout(function() {
                setHomes(data);
            }, (1 * 100));

        })
        console.log("fetchHomes did")
    }
    useEffect( () => {
        // получить список домов при запусе приложения
        fetchHomes();
    },[])
    useEffect( () => {
        // если поменялись дома, задать поинтер на первый дом
        if (homes.length>0){
            setCurrentHomeID( homes[0].home_id )
        }
    }, [homes]);

    function homeChange(home_id){
        setCurrentHomeID( Number(home_id) );
    }

    return (
        <div>
            <div className={"row my-3"}>
                <div className={"col-lg-8"}></div>
                <div className={"col-lg-4"}>actions:
                    <div className="btn-group ms-1" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-primary" onClick={fetchHomes}>Reload Homes</button>
                        <button type="button" className="btn btn-primary disabled">Reload Tuya data</button>
                    </div>
                </div>
            </div>
            <HomeSelector
                value={currentHomeID}
                onChange={homeChange}
                homes={homes}
                defaultValue="select home"
            />
            <HomeRoomsTabs
                home = {homes.filter(h => h.home_id === Number(currentHomeID))[0]}
                activeTabIndex = {0}
            />
            <ToastContainer />
        </div>
    );
}

export default App;
