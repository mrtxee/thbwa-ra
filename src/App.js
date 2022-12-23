import React, {useEffect, useRef, useState} from 'react';
import {Alert, Button, ButtonGroup, Spinner} from 'reactstrap';
import axios from "axios";
import HomeRoomsTabs from "./components/ui/HomeRoomsTabs";
import HomeSelector from "./components/ui/HomeSelector";
import {toast, ToastContainer} from "react-toastify";
import PostService from "./API/PostService";


function App() {
    const [homes, setHomes] = useState([]);
    const [currentHomeID, setCurrentHomeID] = useState(0);

    function fetchHomes() {
        PostService.getHomesRoomsDevices().then(data => {
            setHomes(data);
        })
    }
    useEffect( () => {
        fetchHomes();
    },[])
    useEffect( () => {
        // если поменялись дома, установить поинтер на первый дом
        if (homes.length>0){
            setCurrentHomeID( homes[0].home_id )
        }
    }, [homes]);

    function homeChange(home_id){
        setCurrentHomeID( Number(home_id) );
    }
    async function updateDeviceState(device, setDeviceState) {
        const loadData = (async () => {
            PostService.getDeviceState(device).catch(err => {
                console.log(`err 9999999999 on ${device.device_id}`);
                toast.error("shit! 9",{
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                //console.log(err)
            }).then(resp => {
                if (resp){
                    console.log(`update component status ${device.device_id}`)
                    const newDeviceState = resp
                    setDeviceState(newDeviceState)
                }
                else {
                    console.log(`err 777777777 on ${device.device_id}`);
                    toast.error("shit! 7", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
            })
        });
        await loadData(device, setDeviceState)
        const interval = setInterval(() => {
            loadData(device,setDeviceState)
        }, 3600 * 1000)
        return () => clearInterval(interval)
    }
    async function postDeviceState(device, newDeviceState) {
        console.log('AXIOS is posting newDeviceState '+newDeviceState)
        PostService.postDeviceState(device, newDeviceState).then(resp => {
            const data = resp
            if(!data.success){
                toast.error("shit!",{
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }
        })
    }


    return (
        <div className={"container-fluid"}>
            <div className={"container mb-4 p-0"}>
                <div className="float-end btn-group m-0 p-0" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-primary" onClick={fetchHomes}>Reload Homes</button>
                    <button type="button" className="btn btn-primary disabled">Reload Tuya data</button>
                </div>
                <br/>
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
                updateDeviceStateMethod = {updateDeviceState}
                postDeviceStateMethod = {postDeviceState}
            />
            <ToastContainer />
        </div>
    );
}

export default App;
