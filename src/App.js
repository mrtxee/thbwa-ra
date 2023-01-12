import React, {useEffect, useState} from 'react';
import HomeRoomsTabs from "./components/ui/HomeRoomsTabs";
import HomeSelector from "./components/ui/HomeSelector";
import {toast, ToastContainer} from "react-toastify";
import PostService from "./API/PostService";

function App() {
    // TuyaWebSocket is not supported in browser cli mode =(
    // const TuyaWebSocket = require('./wss/dist').default;
    // const TuyaWebSocketClient = new TuyaWebSocket({
    //     accessId: "4fuehnegqrfqspnpymn9",
    //     accessKey: "5bb653adee024441aa74fc49f50b6727",
    //     url: TuyaWebSocket.URL.EU,
    //     env: TuyaWebSocket.env.PROD,
    //     maxRetryTimes: 100,
    // });
    // TuyaWebSocketClient.message((ws, message) => {
    //     TuyaWebSocketClient.ackMessage(message.messageId);
    //     if(4===message.payload.protocol)
    //         console.log('protocol',message.payload.protocol
    //             ,'device_id', message.payload.data.devId
    //             , 'updateStatus:',message.payload.data.status[0].code,'=',message.payload.data.status[0].value);
    // });
    // TuyaWebSocketClient.start()



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
                //console.log(`status loading error for ${device.device_id} ${device.name}`);
                toast.error(`status loading error for ${device.device_id} ${device.name}`,{
                    position: toast.POSITION.BOTTOM_RIGHT,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                });
                //console.log(err)
            }).then(resp => {
                if (resp){
                    //console.log(`update component status via HTTP ${device.device_id}`)
                    const newDeviceState = resp
                    setDeviceState(newDeviceState)
                }
                else {
                    //console.log(`update component status ERROR for ${device.device_id}`)
                }
            })
        });
        await loadData(device, setDeviceState)
        const interval = setInterval(() => {
            loadData(device, setDeviceState)
        }, 3600 * 1000)
        return () => clearInterval(interval)
    }
    async function postDeviceState(device, newDeviceState) {
        console.log('AXIOS is posting newDeviceState '+newDeviceState)
        PostService.postDeviceState(device, newDeviceState).then(resp => {
            const data = resp
            if(!data.success){
                toast.error(`device managing error for ${device.device_id} ${device.name}`,{
                    position: toast.POSITION.BOTTOM_RIGHT,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
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
