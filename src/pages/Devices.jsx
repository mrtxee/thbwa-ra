import React, {useEffect, useState} from 'react';
import {toast_error, toast_success} from "../components/ui/ToastCt";
import ToolsPanel from "../components/ui/ToolsPanel";
import HomeSelector from "../components/ui/HomeSelector";
import HomeRoomsTabs from "../components/ui/HomeRoomsTabs";
import BadTuyaCredentialsErrorModal from "../components/ui/Devices/BadTuyaCredentialsErrorModal";
import PostServiceV2 from "../api/PostServiceV2";

const Devices = () => {
    const [homes, setHomes] = useState([]);
    const [currentHomeID, setCurrentHomeID] = useState(0);
    const [loadTuyaDevicesRecommendationFlag, setLoadTuyaDevicesRecommendationFlag] = useState(false);
    const [showBadTuyaCredentialsErrorModal, setShowBadTuyaCredentialsErrorModal] = useState(false);
    useEffect(() => {
        fetchHomes();
    }, [])

    useEffect(() => {
        if (homes.length > 0) {
            setCurrentHomeID(homes[0].home_id)
        }
    }, [homes]);

    function fetchHomes() {
        PostServiceV2.getHomesRoomsDevices(
            (errMsg, err) => processTuyaError(err),
            (res) => {
                setHomes(res.data);
                setLoadTuyaDevicesRecommendationFlag(res.data.length < 1);
            }
        );
    }

    function processTuyaError(err){
        if (422 === err.status) setShowBadTuyaCredentialsErrorModal(true);
        toast_error(`${err.status} ${err.statusText} ${err.data}`.substring(0, 199));
    }

    async function updateDeviceState(device, setDeviceState) {
        const loadDeviceState = (device, setDeviceState) => PostServiceV2.getDeviceState(
            (errMsg, err) => processTuyaError(err),
            (res) => {
            setDeviceState(res.data)
        }, device.device_id);
        loadDeviceState(device, setDeviceState);
        const interval = setInterval(() => {
            loadDeviceState(device, setDeviceState)
        }, 3600 * 1000)
        return () => clearInterval(interval)
    }

    async function postDeviceState(device, newDeviceState) {
        PostServiceV2.putDeviceState(
            (errMsg, err) => processTuyaError(err),
            () => {},
            device.device_id, newDeviceState)
    }

    async function sendRCC(device_uuid, remote_uuid, category_id, remote_index, key, key_id) {
        PostServiceV2.sendRCC(
            (errMsg, err) => processTuyaError(err),
            () => {},
            device_uuid, {remote_uuid, category_id, remote_index, key, key_id})
    }

    return (<div className={"container container-fluid p-2"}>
        <ToolsPanel
            loadTuyaDevicesSuccessCallback={fetchHomes}
            loadTuyaDevicesRecommendationFlag={loadTuyaDevicesRecommendationFlag}
            successMsgCallback={toast_success}
            processTuyaError={processTuyaError}
        />
        <HomeSelector
            value={currentHomeID}
            onChange={(home_id)=>setCurrentHomeID(Number(home_id))}
            homes={homes}
            renderTheme={localStorage.getItem('theme') == null ? "auto" : localStorage.getItem('theme')}
            defaultValue="select home"
        />
        <HomeRoomsTabs
            home={homes.filter(h => h.home_id === Number(currentHomeID))[0]}
            activeTabIndex={0}
            updateDeviceStateMethod={updateDeviceState}
            postDeviceStateMethod={postDeviceState}
            sendRCCMethod={sendRCC}
        />
        <BadTuyaCredentialsErrorModal
            showBadTuyaCredentialsErrorModal={showBadTuyaCredentialsErrorModal}
            setShowBadTuyaCredentialsErrorModal={setShowBadTuyaCredentialsErrorModal}
        />
    </div>);
};

export default Devices;