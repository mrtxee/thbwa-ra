import React, {useEffect, useState} from 'react';
import PostService from "../api/PostService";
import {toast_error, toast_success} from "../components/ui/ToastCt";
import ToolsPanel from "../components/ui/ToolsPanel";
import HomeSelector from "../components/ui/HomeSelector";
import HomeRoomsTabs from "../components/ui/HomeRoomsTabs";
import CredentialsErrorModal from "../components/ui/CredentialsErrorModal";

const Devices = () => {
    const [homes, setHomes] = useState([]);
    const [currentHomeID, setCurrentHomeID] = useState(0);
    const [loadSmartHomesRecommendFlag, setLoadSmartHomesRecommendFlag] = useState(false);
    const [showBadCredentialErrorModal, setShowBadCredentialErrorModal] = useState(false);

    useEffect( () => {
        fetchHomes();
    },[])

    useEffect( () => {
        if (homes.length>0){
            setCurrentHomeID( homes[0].home_id )
        }
    }, [homes]);

    function fetchHomes() {
        PostService.getHomesRoomsDevices().then(data => {
            setHomes(data);
            setLoadSmartHomesRecommendFlag(data.length<1);
        })
    }
    function badCredentialErrorModalHandler(){
        setShowBadCredentialErrorModal(true);
    }
    function homeChange(home_id){
        setCurrentHomeID(Number(home_id));
    }

    async function updateDeviceState(device, setDeviceState) {
        const loadData = (async () => {
            PostService.getDeviceState(device).catch(err => {
                if ('badCredentialError'===err.message)
                    badCredentialErrorModalHandler();
                toast_error(`status loading error for ${device.device_id} ${device.name}`);
            }).then(resp => {
                if (resp){
                    const newDeviceState = resp
                    setDeviceState(newDeviceState)
                }
                else
                    toast_error(`update component status ERROR for ${device.device_id}`)
            })
        });
        await loadData(device, setDeviceState)
        const interval = setInterval(() => {
            loadData(device, setDeviceState)
        }, 3600 * 1000)
        return () => clearInterval(interval)
    }
    async function postDeviceState(device, newDeviceState) {
        PostService.postDeviceState(device, newDeviceState).then(resp => {
            const data = resp
            if(!data.success){
                toast_error(`device managing error for ${device.device_id} ${device.name}`);
            }
        })
    }
    async function sendRCC(device_uuid, remote_uuid, category_id, remote_index, key, key_id) {
        PostService.sendRCC(device_uuid, remote_uuid, category_id, remote_index, key, key_id).then(resp => {
            const data = resp
            if(!'sent'==data){
                toast_error(`sendRCC error for ${device_uuid}.${remote_uuid}`);
            }
        })
    }

    return (
        <div className={"container-fluid p-0"}>
            <ToolsPanel
                loadSmartHomesSuccessCallback= {fetchHomes}
                loadSmartHomesRecommendFlag= {loadSmartHomesRecommendFlag}
                errorMsgCallback= {toast_error}
                successMsgCallback= {toast_success}
                badCredentialErrorCallback={badCredentialErrorModalHandler}
            />
            <HomeSelector
                value={currentHomeID}
                onChange={homeChange}
                homes={homes}
                renderTheme = {localStorage.getItem('theme')==null?"auto":localStorage.getItem('theme')}
                defaultValue="select home"
            />
            <HomeRoomsTabs
                home = {homes.filter(h => h.home_id === Number(currentHomeID))[0]}
                activeTabIndex = {0}
                updateDeviceStateMethod = {updateDeviceState}
                postDeviceStateMethod = {postDeviceState}
                sendRCCMethod = {sendRCC}
            />
            <CredentialsErrorModal
                showBadCredantialsErrorModal = {showBadCredentialErrorModal}
                setShowBadCredantialsErrorModal = {setShowBadCredentialErrorModal}
            />
        </div>
    );
};

export default Devices;